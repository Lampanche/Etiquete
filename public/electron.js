const {app,BrowserWindow, ipcMain,ipcRenderer} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev")
const IntegracaoNext = require("./pup.js");

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload:path.join(__dirname,"preloader.js")
        }
    });

    const server = require('../api/server');
    
    console.log(isDev)
    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    //const integracao = new IntegracaoNext()
    //integracao.cadastraProdutoNex()
    return win;

}

app.whenReady().then(()=>{
    const win = createWindow();
    app.on("active",()=>{
        if(BrowserWindow.getAllWindows().length === 0)createWindow();
    });

    const integracaoNex = new IntegracaoNext()


    ipcMain.on('getprodutoData', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.cadastraProdutoNex(data)
            return e.returnValue
        } 
        catch (error) 
        {
            console.log(error)
        }
    })

    ipcMain.on('getTipoData', async (e, data) => {
        try 
        {
            
            console.log(data);
            e.returnValue = await integracaoNex.cadastroTipoNex(data)
            
           
            return  e.returnValue 
            
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getModeloData', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.cadastroModeloNex(data)
           
        
            return e.returnValue

        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getFornecedorData', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.cadastroFornecedorNex(data)
            return e.returnValue
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getProdutoEditData', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.edicaoCadastroProdutoNex(data)
            return e.returnValue
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getDataEditTipo', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.edicaoTipoNex(data)
            return e.returnValue
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getDataEditModelo', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.edicaoModeloNex(data)
            return e.returnValue
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })

    ipcMain.on('getDataEditFornecedor', async (e, data) => {
        try 
        {
            e.returnValue = await integracaoNex.edicaoFornecedorNex(data)
            return e.returnValue
            
        } 
        catch (error) 
        {
            console.log(error) 
        }
    })
    ipcMain.on('minimizar-janela', () => {
        
        if (win) {
          win.minimize();
          
        }
      });
      ipcMain.on('maximiza-janela', () => {
        
        if (win) {
          win.maximize(); 
          
        }
      });
});



app.on("windown-all-closed",()=>{
    if(process.platform !== "darwin"){
        app.quit();
    }
});