
const { Model } = require('sequelize');
const UserService = require("./UserService")
const path = require('path')


const childProcess = require('child_process')

var wdOpts = { capabilities: { browserName: 'chrome' } }

class IntegracaoService{
    static async  cadastraProdutoex(){
        const puppeteer = require('puppeteer-core');
        const chromium = require('chromium');
        const isDev = require('electron-is-dev');
        
        // função de inicialização do Browser
        async function setBrowser() {
          // quando o programa estiver em modo de produção o caminho do chromium muda
          // não encontrei um modo mais eficiente de mudar o caminho do chromium, por isso uso esse replace.
          const executablePath = isDev ? chromium.path : chromium.path.replace('app.asar', 'app.asar.unpacked');
          const browser = await puppeteer.launch({
            headless: true, // caso você ache conveniente, pode colocar aqui a variável isDev
            executablePath,
          });
        
          return browser;
        }        
       async function  funcionabaixonengue(){
          const browser = await setBrowser();
        
          // aqui estamos instanciando a página onde tudo vai acontecer
          const page = await browser.newPage();
          await page.setViewport({ width: 1366, height: 768 });
        
          // função que direciona o puppeter pra uma página específica
          await page.goto('https://google.com');
          
          await browser.close();
       }
        
         
        
        
        
    }

}

module.exports = IntegracaoService;
