const express = require('express');
const ProdutoController = require('../Controllers/produtoController');

const router = express.Router();

router.get('/produtos', ProdutoController.getAllProdutos);
router.get('/produtos/:id', ProdutoController.getProdutoById);
router.post('/produtos', ProdutoController.createProduto);
router.put('/produtos/:id', ProdutoController.updateProduto);
router.delete('/produtos/:id', ProdutoController.deleteProduto);
router.get('/autocomplete/produtos',ProdutoController.autoComplete);

module.exports = router;