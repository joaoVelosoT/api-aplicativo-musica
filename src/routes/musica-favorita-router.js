const { Router } = require('express');
const router = Router();
const TokenAuthenticate = require('../middlewares/token-authenticate');
const { MusicaFavoritaValidate, MusicaFavoritaValidateID } = require('../middlewares/musica-favorita-validate');
const MusicaFavoritaController = require('../controllers/musica-favorita-controller');


// Create musica favorita
router.post('/', TokenAuthenticate, MusicaFavoritaValidate,MusicaFavoritaController.create);

// GetAll musicas favortias
router.get('/', TokenAuthenticate, MusicaFavoritaController.getAll);

// GetOne musica favorita
router.get('/:id', TokenAuthenticate, MusicaFavoritaValidateID, MusicaFavoritaController.getOne);

// Update Musica favorita
router.put('/:id', TokenAuthenticate, MusicaFavoritaValidateID, MusicaFavoritaValidate, MusicaFavoritaController.update);

// Delete musica favorita
router.delete('/:id', TokenAuthenticate, MusicaFavoritaValidateID, MusicaFavoritaController.delete);



module.exports = router;