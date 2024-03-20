const express = require('express');
const TamanhoController = require('../Controllers/tamanhoController');

const router = express.Router();

router.get('/tamanhos', TamanhoController.getAllTamanhos);
router.get('/tamanhos/:id', TamanhoController.getTamanhoById);
router.post('/tamanhos', TamanhoController.createTamanho);
router.put('/tamanhos/:id', TamanhoController.updateTamanho);
router.delete('/tamanhos/:id', TamanhoController.deleteTamanho);
router.get('/autocomplete/tamanhos',TamanhoController.autoComplete);

module.exports = router;