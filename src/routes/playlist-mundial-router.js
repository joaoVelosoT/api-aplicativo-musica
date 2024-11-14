const { Router } = require('express');
const PlaylistMundialController = require('../controllers/playlist-mundial-controller');
const { PlaylistMundialValidate, PlaylistMundialValidateId } = require('../middlewares/playlist-mundial-validate');
const router = Router();


router.post('/', PlaylistMundialValidate, PlaylistMundialController.create);

router.get('/', PlaylistMundialController.getAll);

router.get('/:id', PlaylistMundialValidateId, PlaylistMundialController.getOne);

router.put('/:id', PlaylistMundialValidateId, PlaylistMundialController.update);

router.delete('/:id', PlaylistMundialValidateId, PlaylistMundialController.delete);

module.exports = router;