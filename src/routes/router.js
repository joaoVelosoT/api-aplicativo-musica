const {Router} = require('express');
const router = Router();
const UserRouter = require('./user-router');
const MusicaRouter = require('./musica-router');
const PlaylistRouter = require('./playlist-router');
const PlayMusicRouter = require('./playlist-music-router');
const MusicaFavoritaRouter = require('./musica-favorita-router');
const PlaylistMundialRouter = require('./playlist-mundial-router');

router.use('/user', UserRouter);
router.use('/musica', MusicaRouter);
router.use('/playlist', PlaylistRouter);
router.use('/playmusic', PlayMusicRouter);
router.use('/musicfavorita', MusicaFavoritaRouter);
router.use('/playlistmundial', PlaylistMundialRouter);

module.exports = router;