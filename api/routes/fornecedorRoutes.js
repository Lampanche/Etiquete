const express = require('express');
const fornecedorController = require('../Controllers/fornecedorController');

const router = express.Router();

router.get('/fornecedores', fornecedorController.getAllFornecedores);
router.get('/fornecedores/:id', fornecedorController.getFornecedorById);
router.post('/fornecedores', fornecedorController.createFornecedor);
router.put('/fornecedores/:id', fornecedorController.updateFornecedor);
router.delete('/fornecedores/:id', fornecedorController.deleteFornecedor);
router.get('/autocomplete/fornecedores', fornecedorController.autoComplete);

module.exports = router;