const { Router } = require('express');
const PlaylistMundialMusicController = require('../controllers/playlist-mundial-musica-controller');
const { PlaylistMundialMusicaValidate, PlaylistMundialMusicaValidateId, PlaylistMundialMusicaValidateUpdate } = require('../middlewares/playlist-mundial-musica-validate');
const router = Router();

router.post('/', PlaylistMundialMusicaValidate, PlaylistMundialMusicController.create);

router.get('/', PlaylistMundialMusicController.getAll)

router.get('/getbyplaylist/:id', PlaylistMundialMusicaValidateId, PlaylistMundialMusicController.getByPlaylist);

router.get('/:id', PlaylistMundialMusicaValidateId, PlaylistMundialMusicController.getOne)

router.put('/:id', PlaylistMundialMusicaValidateId, PlaylistMundialMusicaValidateUpdate, PlaylistMundialMusicController.update)

router.delete('/:id', PlaylistMundialMusicaValidateId, PlaylistMundialMusicController.delete);




module.exports = router;