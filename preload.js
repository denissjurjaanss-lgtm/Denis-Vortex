const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveUserData: (data) => ipcRenderer.invoke('save-user-data', data),
  getUserData: () => ipcRenderer.invoke('get-user-data'),
  quit: () => ipcRenderer.invoke('quit-app')
});
