const express = require('express');
const RegiaoController = require('../Controllers/regiaoController');

const router = express.Router();

router.get('/regiao', RegiaoController.getAllRegioes);
router.get('/regiao/:id', RegiaoController.getRegiaoById);
router.post('/regiao', RegiaoController.createRegiao);
router.put('/regiao/:id', RegiaoController.updateRegiao);
router.delete('/regiao/:id', RegiaoController.deleteRegiao);
router.get('/autocomplete/regiao',RegiaoController.autoComplete);

module.exports = router;