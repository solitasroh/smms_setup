import { HostConnectionChannel } from "./channel/HostConnectionChannel";
import { ModbusTcpService } from "./services/modbus-service";
import { app, BrowserWindow, ipcMain } from "electron";
import { IpcChannel } from "./ipc/ipcChannel";
import { IpcRequest } from "./ipc/ipcRequest";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

class Main {
  private mainWindow: BrowserWindow;
  private readonly modbusService: ModbusTcpService;

  constructor(modbusService: ModbusTcpService) {
    this.modbusService = modbusService;
  }

  init(ipcChannels: IpcChannel<IpcRequest>[]) {
    app.on("ready", this.createWindow);
    app.on("window-all-closed", this.onWindowClosed);
    app.on("activate", this.onActivate);

    this.registerIpcChannels(ipcChannels);
  }

  private onWindowClosed(): void {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload: __dirname + "/preload.js",
      },
    });
    // and load the index.html of the app.
    this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    this.mainWindow.webContents.openDevTools();
  }
  private registerIpcChannels(ipcChannels: IpcChannel<IpcRequest>[]): void {
    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.getName(), (event, request) =>
        channel.handle(event, request)
      )
    );
  }
}

const modbusService = new ModbusTcpService();

new Main(modbusService).init([new HostConnectionChannel(modbusService)]);
