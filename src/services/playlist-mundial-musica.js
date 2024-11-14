const PlaylistMundialMusic = require("../models/PlaylistMundial-Music");
const MusicaService = require("./musica-service");
const PlaylistMundialService = require("./playlist-mundial-service");

const PlaylistMundialMusicService = {
  create: async (data) => {
    // Validar se existe a musica
    const musica = await MusicaService.getOne(data.idMusica);
    if (musica.error) {
      return {
        error: true,
        code: musica.code,
        msg: musica.msg,
      };
    }

    // Validar se existe a playlist
    const playlistMundial = await PlaylistMundialService.getOne(
      data.idPlaylist
    );
    if (playlistMundial.error) {
      return {
        error: true,
        code: playlistMundial.code,
        msg: playlistMundial.msg,
      };
    }


    // Validar se ja existe a musica na playlist

    const playlistMundialMusic = await PlaylistMundialMusic.create(data);

    return {
      playlistMundialMusica: playlistMundialMusic,
      code: 201,
      msg: "Musica adicionada na playlist mundial",
    };
  },
  getAll: async () => {
    const playlistMundialMusicas = await PlaylistMundialMusic.find();

    const arrayDetalhado = [];

    for (const musicaPlaylist of playlistMundialMusicas) {
      const musica = await MusicaService.getOne(musicaPlaylist.idMusica);
      // Validando se existe a musica
      if (musica.error) {
        return {
          error: true,
          code: musica.code,
          msg: musica.msg,
        };
      }

      // Validar se existe a playlist
      const playlistMundial = await PlaylistMundialService.getOne(
        musicaPlaylist.idPlaylist
      );
      if (playlistMundial.error) {
        return {
          error: true,
          code: playlistMundial.code,
          msg: playlistMundial.msg,
        };
      }

      const obj = {
        _id: musicaPlaylist._id,
        musica: {
          _id: musica._id,
          nomeMusica: musica.nome,
        },
        playlistMundial: {
          _id: playlistMundial._id,
          nomePlaylist: playlistMundial.nome,
        },
      };

      arrayDetalhado.push(obj);
    }


    return arrayDetalhado
  },
};


module.exports = PlaylistMundialMusicService