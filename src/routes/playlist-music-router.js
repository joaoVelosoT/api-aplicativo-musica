const {Router} = require('express');
const PlaylistMusicController = require('../controllers/playlist-music-controller');
const { PlaylistMusicValidate, PlaylistMusicValidateId } = require('../middlewares/playlist-music-validate');
const TokenAuthenticate = require('../middlewares/token-authenticate');
const router = Router();

// PlaylistMusic Create
router.post('/', TokenAuthenticate, PlaylistMusicValidate, PlaylistMusicController.create);

// PlaylistMusic getAll
router.get('/', TokenAuthenticate, PlaylistMusicController.getAll);

// PlaylistMusic getOne
router.get('/:id', TokenAuthenticate,  PlaylistMusicValidateId, PlaylistMusicController.getOne);

// PlaylistMusic update
router.put('/:id', TokenAuthenticate, PlaylistMusicValidateId, PlaylistMusicController.update);

// PlaylistMusic delete
router.delete('/:id', TokenAuthenticate, PlaylistMusicValidateId, PlaylistMusicController.delete);

module.exports = router;