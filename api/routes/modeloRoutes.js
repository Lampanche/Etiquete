const express = require('express');
const ModeloController = require('../Controllers/modeloController');

const router = express.Router();

router.get('/modelos', ModeloController.getAllModelos);
router.get('/modelos/:id', ModeloController.getModeloById);
router.post('/modelos', ModeloController.createModelo);
router.put('/modelos/:id', ModeloController.updateModelo);
router.delete('/modelos/:id', ModeloController.deleteModelo);
router.get('/autocomplete/modelos', ModeloController.autoComplete);

module.exports = router;