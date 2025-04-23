import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 2268,
    height: 1536,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:5173') // Vite dev server
  // win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})