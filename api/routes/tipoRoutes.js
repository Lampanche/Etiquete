const express = require('express');
const TipoController = require('../Controllers/TipoController');

const router = express.Router();


router.get('/tipos/:id', TipoController.getTipoById);
router.post('/tipos', TipoController.createTipo);
router.put('/tipos/:id', TipoController.updateTipo);
router.delete('/tipos/:id', TipoController.deleteTipo);
router.get('/tipos', TipoController.getAllTipos);
router.get('/autocomplete/tipos',TipoController.autoComplete);

module.exports = router;