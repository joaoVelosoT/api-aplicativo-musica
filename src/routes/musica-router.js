const { Router } = require('express');
const { MusicaValidate, MusicaValidateID } = require('../middlewares/musica-validate');
const MusicaController = require('../controllers/musica-controller');
const router = Router();


// Create musica
router.post('/', MusicaValidate, MusicaController.create);

// GetAll musica
router.get('/', MusicaController.getAll);

// GetOne musica
router.get('/:id', MusicaValidateID , MusicaController.getOne);

// Update musica
router.put('/:id', MusicaValidateID, MusicaController.update);

// Delete musica
router.delete('/:id', MusicaValidateID, MusicaController.delete);

module.exports = router;