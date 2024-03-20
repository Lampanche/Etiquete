const phantom = require('phantom')
var page = require('webpage').create();
var url = 'https://www.google.com';

page.open(url, function(status) {
    console.log("teste")
  if (status === 'success') {
    console.log('Página carregada com sucesso');
    phantom.exit();
  } else {
    console.log('Erro ao carregar a página');
    phantom.exit(1);
  }
});