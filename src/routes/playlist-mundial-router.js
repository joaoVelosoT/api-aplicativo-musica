const { Router } = require('express');
const PlaylistMundialController = require('../controllers/playlist-mundial-controller');
const router = Router();


router.post('/', PlaylistMundialController.create);

router.get('/', PlaylistMundialController.getAll);

router.get('/:id', PlaylistMundialController.getOne);

router.put('/:id', PlaylistMundialController.update);

router.delete('/:id', PlaylistMundialController.delete);

module.exports = router;