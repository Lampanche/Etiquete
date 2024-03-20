const puppeteer = require('puppeteer-core');
const chromium = require('chromium');
const isDev = require('electron-is-dev');

class IntegracaoNext{
        // função de inicialização do Browser
  async setBrowser() {
        
    const executablePath = isDev ? chromium.path : chromium.path.replace('app.asar', 'app.asar.unpacked');
    const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
    
    });
    
    return browser;
  }
  
  async cadastraProdutoNex(objProduto){

    const newObj = JSON.parse(objProduto)

    const formatPrecoVenda = newObj.data.produto.precoVenda.toFixed(2).replace('.', ',')

    const formatPrecoCusto = newObj.data.produto.precoCusto.toFixed(2).replace('.', ',')

    console.log(newObj.data.produto.codigo, '[CODIGO]')
    
    let returnNexCadastro = "Produto cadastrado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();

    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      
    
    await page.goto('https://www.web.nextar.com.br/home/products')
    
  
   

  try {
    await page.waitForSelector('#create-button')
    await page.locator('#create-button').click();      
  } catch (error) {
    console.error(`Elemento não encontrado: ${error.message}`);     
  
  }

    await page.locator('#description').fill(newObj.data.produto.nome)

    await page.locator('#code').fill(String(newObj.data.produto.codigo))

    await page.locator('#category').fill(String(newObj.data.produto.tipo.nome))

    await page.keyboard.press('Enter')

    await page.locator('#subcategory').fill(String(newObj.data.produto.modelo.nome))

    await page.keyboard.press('Enter')

    await page.locator('#brand').fill(String(newObj.data.produto.fornecedor.nome))

    await page.keyboard.press('Enter')

    await page.locator('#price').fill(formatPrecoVenda)

    await page.locator('#cost_price').fill(formatPrecoCusto)

    await page.locator('#unit').fill('Peça')

    await page.keyboard.press('Enter')

    await page.locator('#obs').fill(String(newObj.data.produto.tamanho.nome))

    const btnSaveProduto = await page.waitForSelector('.product-tabs__button--save')

    await btnSaveProduto.click()

    const modalError = await page.$('.ant-modal-body')

    if(modalError)
    {
      returnNexCadastro = 'Produto já cadastrado'

      await browser.close()

      return returnNexCadastro

    }

    await page.waitForSelector('.nex-workspace')

    await page.waitForSelector('.valued-cell')

    await browser.close()

    return returnNexCadastro

  }

  async cadastroTipoNex(objTipo)
  {

    const newObj = JSON.parse(objTipo)

    let returnNexCadastro = "Tipo cadastrado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();

    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }
    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      

    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('.button-manage-categories').click()

    if(newObj.listaTipos.tipos.length > 1)
    {
      try{
        await page.waitForTimeout(2000)
        await page.waitForSelector('.entity-listing-container')
      }catch(error){
        returnNexCadastro = 'erro ao cadastrar tipo no NEX';
  
        await browser.close()
  
        return returnNexCadastro
      }

    const listaTiposCadastrados = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.entity-listing-container p')))

    const listaTiposCadastradosValues = await listaTiposCadastrados.evaluate(array => array.map(p => p.textContent.slice(0, -4)))

    for(let x = 0; x <= listaTiposCadastradosValues.length - 1; x++)
    {   
        if(String(listaTiposCadastradosValues[x]) === String(newObj.nome))
        {
          returnNexCadastro = "Tipo já cadastrado"

          await browser.close()

          return returnNexCadastro
        }
    }  

    await page.locator('.add').click()
      

    }
    else
    { 
      await page.locator('.add').click()  
  
    }

    await page.locator('.antd-input').fill(String(newObj.nome))

    const listsubsCadastrados = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.drawer-subcategories input')))

    const arraySubs = await listsubsCadastrados.evaluate((array) => array.map(input => input.value))

    if(arraySubs.length > 0)
    {   

        const listValueInputs = await listsubsCadastrados.evaluate((array) => array.map(input => input.value))

        for(let i = 0; i <= newObj.listaModelos.modelos.lenght - 1; i++)
        {   
          let match = false

          for(let y = 0; y <= listValueInputs.lenght - 1; y++)
          { 
              if(String(listValueInputs[y]) === String(newObj.listaModelos.modelos[i]))
              {
                match = true
              }
          }

          if(!match)
          {
            const btnAddSub = await page.waitForSelector('.drawer-subcategories__buttonAdd')

            await btnAddSub.click()

            await page.waitForSelector('.--error')

            await page.locator('.--error').fill(String(newObj.listaModelos.modelos[i].nome)) 

          }
        }

      await page.locator('.save').click()

    }

  

    if(arraySubs.length == 0)
    {
      const newObj2 = JSON.parse(objTipo)

      const listModelosFormat = newObj2.listaModelos.modelos.map((obj) => new Object(obj))

      if(listModelosFormat.length > 0)
      {
        for(let t = 0; t <= listModelosFormat.length - 1; t++)
        { 
  
            console.log(listModelosFormat[t])
    
            console.log(listModelosFormat[t].nome)
    
            const btnAddSub = await page.waitForSelector('.drawer-subcategories__buttonAdd')
    
            await btnAddSub.click()
    
            await page.waitForSelector('.--error')
            await page.waitForTimeout(300)
            await page.locator('.--error').fill(listModelosFormat[t].nome) 
              

            

          
  
        }

        await page.locator('.save').click()

      }
      else
      {
        await page.locator('.save').click()
      }

    }

    await page.locator('.nex-icon-close').click()

    await browser.close()

    return returnNexCadastro

  }

  async cadastroModeloNex(objModelo)
  {
    const newObj = JSON.parse(objModelo)

    let returnNexCadastro = "Modelo cadastrado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();


    // função que direciona o puppeter pra uma página específica
    const status = await page.goto('https://www.web.nextar.com.br/login');
    

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      

    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('.button-manage-categories').click()
    
    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.entity-listing-container')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }
    

    const arrayBtns = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('button')))
    
    const properties = await arrayBtns.getProperties()
    
    const children = []

    for( const property of properties.values())
    {
      const element = property.asElement()
      
      if(element)
      {
        children.push(element)
      }

    }

    const tamanho = children.length - 1

    for(let i = 0; i <= tamanho; i++)
    { 
     
      try{
        await page.waitForTimeout(2000)
        await page.waitForSelector('.entity-listing-container')
      }catch(error){
        returnNexCadastro = 'erro ao cadastrar modelo no NEX';
  
        await browser.close()
  
        return returnNexCadastro
      }
      

      const btnSub = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('button')))
      
      const propertiesBtn = await btnSub.getProperties()
      
      const childrensBtn = []
  
      for( const property of propertiesBtn.values())
      {
        const elementBtn = property.asElement()
        
        if(elementBtn)
        {
          childrensBtn.push(elementBtn)
        }
  
      }

      if(!await childrensBtn[i].isVisible())
      {
        break
      }
      
      await childrensBtn[i].click()

      const btnAddSub = await page.waitForSelector('.drawer-subcategories__buttonAdd')

      await btnAddSub.click()

      await page.waitForSelector('.--error')

      await page.locator('.--error').fill(String(newObj.nome))

     
      const modeloexistente =   await page.$('.drawer-subcategories__content-span')
      if(modeloexistente != null){
        returnNexCadastro = 'Modelo já cadastrado'

        await browser.close()

        return returnNexCadastro
      
      }
      console.log(modeloexistente,"EXISTE ESSA PARADA");
      
      

      const btnSave = await page.waitForSelector('.save')

      await btnSave.click()

    }
    
    const btnClose = await page.waitForSelector('.nex-icon-close')

    await btnClose.click()

    //await browser.close()

    return returnNexCadastro
  }

  async cadastroFornecedorNex(objFornecedor)
  {
    const newObj = JSON.parse(objFornecedor)

    let returnNexCadastro = "Fornecedor cadastrado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();


    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      console.log("Entrei no erro")
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      
    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('#create-button').click()
    try{
      await page.waitForTimeout(1000)
      await page.waitForSelector('.ant-form')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }
    

    await page.locator('#brand').click()

    const btnGerenciarMarcas = await page.waitForSelector('.nex-dropdown-option')
    console.log("vai clicar")
    await btnGerenciarMarcas.click()
    console.log("clicou")

    console.log(newObj.listaFornecedores.fornecedores, '[FORNECEDORES]')

    if(newObj.listaFornecedores.fornecedores.length > 1)
    {
      try{
        await page.waitForTimeout(1000)
        await page.waitForSelector('.entity-listing-container')
      }catch(error){
        returnNexCadastro = 'erro ao cadastrar modelo no NEX';
  
        await browser.close()
  
        return returnNexCadastro
      }
  
      const listaFornecedoresCadastrados = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.entity-listing-container p')))
  
      const listaFornecedoresCadastradosValues = await listaFornecedoresCadastrados.evaluate(array => array.map(p => p.textContent.slice(0, -4)))
  
      for(let x = 0; x <= listaFornecedoresCadastradosValues.length - 1; x++)
      {   
          if(String(listaFornecedoresCadastradosValues[x]) === String(newObj.nome))
          {
            returnNexCadastro = "Fornecedor já cadastrado."
  
            await browser.close()
  
            return returnNexCadastro
          }
      }
  
      await page.locator('.add').click()

    }
    else
    {
      await page.locator('.add').click()
    }


    await page.locator('.antd-input').fill(String(newObj.nome))

    const btnSave = await page.waitForSelector('.save')

    await btnSave.click()

    await page.locator('.nex-icon-close').click()

    await page.locator('.product-tabs__button--cancel').click()

    const modalCancelar = await page.waitForSelector('.ant-modal-body')

    if(modalCancelar)
    {
      await page.locator('.modal-cancel__group__cancel').click()
    }

    await page.waitForSelector('.nex-workspace')

    await browser.close()

    return returnNexCadastro

  }

  async edicaoCadastroProdutoNex(objProdutoEdit)
  {
    const newObj = JSON.parse(objProdutoEdit)
    console.log(newObj,"[OBJETO]")

    const formatPrecoVenda = Number(newObj.precoVenda).toFixed(2).replace('.', ',')

    const formatPrecoCusto = Number(newObj.precoCusto).toFixed(2).replace('.', ',')

    let returnNexCadastro = "Produto atualizado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();


    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }
    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      
    console.log("TESTE",newObj)
    await page.goto('https://www.web.nextar.com.br/home/products')
    if(typeof newObj.reenvioedicao != "undefined" && (newObj.reenvioedicao == true || newObj.reenvioedicao == "true") ){
      await page.locator('.nex-search__input').fill(newObj.codigoAnterior)
    }else{
      await page.locator('.nex-search__input').fill(newObj.codigo)
    }

    

    const produtoEncontrado = await page.waitForSelector('.dx-row-lines')

    await produtoEncontrado.click()

    await page.waitForSelector('.nex-workspace')

    await page.locator('#description').click({clickCount: 3})

    await page.locator('#description').fill(newObj.nome)

    await page.locator('#code').click({clickCount: 3})

    await page.locator('#code').fill(String(newObj.codigo))

    await page.locator('#category').fill(String(newObj.tipo))

    await page.keyboard.press('Enter')

    await page.locator('#subcategory').fill(String(newObj.modelo))

    await page.keyboard.press('Enter')

    await page.locator('#brand').fill(String(newObj.fornecedor))

    await page.keyboard.press('Enter')

    await page.locator('#price').click({clickCount: 3})

    await page.locator('#price').fill(formatPrecoVenda)

    await page.locator('#cost_price').click({clickCount: 3})

    await page.locator('#cost_price').fill(formatPrecoCusto)

    await page.locator('#obs').click({clickCount: 3})

    await page.locator('#obs').fill(String(newObj.tamanho))

    await page.locator('.product-tabs__button--save').click()

    await page.waitForSelector('.nex-workspace')

    await page.waitForSelector('.valued-cell')

    await browser.close()

    return returnNexCadastro

  }

  async edicaoTipoNex(objTipoEdit)
  {
    const newObj = JSON.parse(objTipoEdit)
    console.log("AQUI23")
    if(typeof newObj.reenvioEdicao != "undefined" && newObj.reenvioEdicao != null && (newObj.reenvioEdicao == true || newObj.reenvioEdicao == "true")){
      newObj.tipo = newObj.anterior;
      newObj.tipoAtt = newObj.atual; 
      console.log(newObj,"[AQUIIII]")       
    }
    
    let returnNexCadastro = "Tipo atualizado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();


    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click(); 
    
    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      

   

    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('.button-manage-categories').click()

    try{
      await page.waitForTimeout(1000)
      await page.waitForSelector('.entity-listing-container')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }

    const arrayBtnsValues = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('p')))

    const arrayPValues = await arrayBtnsValues.evaluate((array) => array.map( p => p.textContent.slice(0, -4)))
    
    for(let i = 0; i <= arrayPValues.length - 1; i++)
    {
      
      if(String(arrayPValues[i]) === String(newObj.tipo))
      {
        const arrayBtns = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('button')))

        const propertiesBtn = await arrayBtns.getProperties()
      
        const childrensBtn = []
  
        for( const property of propertiesBtn.values())
        {
          const elementBtn = property.asElement()
        
          if(elementBtn)
          {
            childrensBtn.push(elementBtn)
          }
  
        }

        await childrensBtn[i].click()

        await page.locator('.antd-input').click({clickCount: 3})

        await page.locator('.antd-input').fill(String(newObj.tipoAtt))

        await page.locator('.save').click()

        try{
          await page.waitForTimeout(1000)
          await page.waitForSelector('.entity-listing-container')
        }catch(error){
          returnNexCadastro = 'erro ao cadastrar modelo no NEX';
    
          await browser.close()
    
          return returnNexCadastro
        }

      }
    }

    await browser.close()

    return returnNexCadastro

  }

  async edicaoModeloNex(objEditModelo)
  {
    const newObj = JSON.parse(objEditModelo)
    console.log("AQUI23")
    if(typeof newObj.reenvioEdicao != "undefined" && newObj.reenvioEdicao != null && (newObj.reenvioEdicao == true || newObj.reenvioEdicao == "true")){
      newObj.modelo = newObj.anterior;
      newObj.modeloAtt = newObj.atual; 
      console.log(newObj,"[AQUIIII]")       
    }

    let returnNexCadastro = "Modelo atualizado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();

    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }
      


    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('.button-manage-categories').click()

    try{
      await page.waitForTimeout(1000)
      await page.waitForSelector('.entity-listing-container')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }

    const arrayBtns = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('button')))
    
    const properties = await arrayBtns.getProperties()
    
    const children = []

    for( const property of properties.values())
    {
      const element = property.asElement()
      
      if(element)
      {
        children.push(element)
      }

    }

    const tamanho = children.length - 1

    for(let i = 0; i <= tamanho; i++)
    { 
      try{
        await page.waitForTimeout(1000)
        await page.waitForSelector('.entity-listing-container')
      }catch(error){
        returnNexCadastro = 'erro ao cadastrar modelo no NEX';
  
        await browser.close()
  
        return returnNexCadastro
      }

      const btnSub = await page.evaluateHandle(() => Array.from(document.querySelector('.entity-listing-container').getElementsByTagName('button')))
      
      const propertiesBtn = await btnSub.getProperties()
      
      const childrensBtn = []
  
      for( const property of propertiesBtn.values())
      {
        const elementBtn = property.asElement()
        
        if(elementBtn)
        {
          childrensBtn.push(elementBtn)
        }
  
      }


      if(!await childrensBtn[i].isVisible())
      {
        break
      }
      
      await childrensBtn[i].click()

      const listInputs = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.drawer-subcategories input')))

      const propertyInputs = await listInputs.getProperties()

      const childrensInputs = []

      for(const property of propertyInputs.values())
      {
        const elementInput = property.asElement()

        if(elementInput)
        {
          childrensInputs.push(elementInput)
        }
      }

      const listValueInputs = await listInputs.evaluate((array) => array.map(input => input.value))

      for(let i = 0; i <= listValueInputs.length; i++)
      {

        if(String(listValueInputs[i]) === String(newObj.modelo))
        {
          await childrensInputs[i].click({clickCount: 3})

          await childrensInputs[i].type(String(newObj.modeloAtt))
          await page.waitForTimeout(1000)
          const btnSave = await page.waitForSelector('.save')

          await btnSave.click()
          

        }

      }

    }
    
    try{
      await page.waitForTimeout(1000)
      await page.waitForSelector('.entity-listing-container')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }

    await browser.close()

    return returnNexCadastro

  }

  async edicaoFornecedorNex(objEditFornecedor){
    const newObj = JSON.parse(objEditFornecedor)
   
    console.log("AQUI23")
    if(typeof newObj.reenvioEdicao != "undefined" && newObj.reenvioEdicao != null && (newObj.reenvioEdicao == true || newObj.reenvioEdicao == "true")){
      newObj.fornecedor = newObj.anterior;
      newObj.fornecedorAtt = newObj.atual; 
      console.log(newObj,"[AQUIIII]")       
    }


    let returnNexCadastro = "Fornecedor atualizado no NEX."

    const browser = await this.setBrowser();
  
    // aqui estamos instanciando a página onde tudo vai acontecer
    const page = await browser.newPage();

    // função que direciona o puppeter pra uma página específica
    const status =  await page.goto('https://www.web.nextar.com.br/login');

    if(status.status() !== 200)
    {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      return returnNexCadastro
    }

    await page.locator('#email').fill(newObj.login);

    await page.locator('#password').fill(newObj.senha);

    await page.locator('.ant-btn').click();

    try {
      await page.waitForTimeout(2000)
      await page.waitForSelector('.ant-modal-body');
      await page.locator(".ant-modal-close").click();      
    } catch (error) {
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
     
    }

    try{
      await page.waitForTimeout(2000)
      await page.waitForSelector('.nex-workspace');  
    }catch(error){
      returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
      await browser.close();
      return returnNexCadastro  
    }    


    await page.goto('https://www.web.nextar.com.br/home/products')

    await page.locator('#create-button').click()

    try{
      await page.waitForTimeout(1000)
      await page.waitForSelector('.ant-form')
    }catch(error){
      returnNexCadastro = 'erro ao cadastrar modelo no NEX';

      await browser.close()

      return returnNexCadastro
    }

    await page.locator('#brand').click()

    const btnGerenciarMarcas = await page.waitForSelector('.nex-dropdown-option')

    await btnGerenciarMarcas.click()

    await page.waitForSelector('.entity-listing-container')

    const listaFornecedoresCadastrados = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.entity-listing-container p')))

    const listaFornecedoresBtn = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.entity-listing-container button')))

    const listaFornecedoresCadastradosValues = await listaFornecedoresCadastrados.evaluate(array => array.map(p => p.textContent.slice(0, -4)))

    for(let x = 0; x <= listaFornecedoresCadastradosValues.length - 1; x++)
    {   
      if(String(listaFornecedoresCadastradosValues[x]) === String(newObj.fornecedorAtt)){
        returnNexCadastro = "Erro ao integrar com o NEX. Ocorreu um erro, não foi possível cadastrar."
        await browser.close();
        return returnNexCadastro 
      }
        if(String(listaFornecedoresCadastradosValues[x]) === String(newObj.fornecedor))
        {
          const properties = await listaFornecedoresBtn.getProperties()
    
          const children = []

          for( const property of properties.values())
          {
            const element = property.asElement()
            
            if(element)
            {
              children.push(element)
            }

          }

          await children[x].click();
        

          await page.locator(".antd-input").click({clickCount: 3})

          await page.locator(".antd-input").fill(newObj.fornecedorAtt)          
          await page.locator(".save").click();
          await page.waitForSelector('.entity-listing-container')
          await page.waitForSelector('.search-and-ordering-container')
          await page.waitForTimeout(1000)
          await browser.close();
          return returnNexCadastro;      

        }
    }



  }

}

module.exports = IntegracaoNext;
