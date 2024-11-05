const {Router} = require('express');
const router = Router();
const UserRouter = require('./user-router');
const MusicaRouter = require('./musica-router');

router.use('/user', UserRouter);
router.use('/musica', MusicaRouter);

module.exports = router;