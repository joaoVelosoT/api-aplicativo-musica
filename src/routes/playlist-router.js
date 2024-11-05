
const {Router} = require('express');
const { PlaylistValidate, PlaylistValidateId } = require('../middlewares/playlist-validate');
const TokenAuthenticate = require('../middlewares/token-authenticate');
const PlaylistController = require('../controllers/playlist-controller');

const router = Router();

// Create playlist
router.post('/', TokenAuthenticate, PlaylistValidate, PlaylistController.create);

// GetAll playlist
router.get('/', TokenAuthenticate, PlaylistController.getAll);

// GetOne playlist
router.get('/:id', TokenAuthenticate, PlaylistValidateId, PlaylistController.getOne);

// Update playlist
router.put('/:id', TokenAuthenticate, PlaylistValidateId, PlaylistController.update);

// Delete playlist
router.delete('/:id', TokenAuthenticate, PlaylistValidateId, PlaylistController.delete);

module.exports = router;

