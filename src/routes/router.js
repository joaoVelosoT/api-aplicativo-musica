const {Router} = require('express');
const router = Router();
const UserRouter = require('./user-router');
const MusicaRouter = require('./musica-router');
const PlaylistRouter = require('./playlist-router');
const PlayMusic = require('./playlist-music-router');

router.use('/user', UserRouter);
router.use('/musica', MusicaRouter);
router.use('/playlist', PlaylistRouter);
router.use('/playmusic', PlayMusic);

module.exports = router;