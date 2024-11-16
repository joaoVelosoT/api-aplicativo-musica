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
    const musicaPlaylist = await PlaylistMundialMusic.findOne({
      idMusica: data.idMusica,
    });

    if (musicaPlaylist) {
      return {
        error: true,
        code: 400,
        msg: "Essa música ja existe na playlist mundial",
      };
    }

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
          _id: musica.musica._id,
          nomeMusica: musica.musica.nome,
        },
        playlistMundial: {
          _id: playlistMundial.playMundial._id,
          nomePlaylist: playlistMundial.playMundial.nome,
        },
      };

      arrayDetalhado.push(obj);
    }

    return {
      arrayDetalhado,
      msg: "Todas as musicas de todas as playlist mundiais",
      code: 200,
    };
  },
  getOne: async (id) => {
    try {
      const musicaPlaylistMundial = await PlaylistMundialMusic.findById(id);

      if (!musicaPlaylistMundial) {
        return {
          error: true,
          code: 404,
          msg: "Não foi encontrada a musica da playlist mundial",
        };
      }

      // console.log("musica", musicaPlaylistMundial);

      const musica = await MusicaService.getOne(musicaPlaylistMundial.idMusica);
      console.log("musica", musica);
      if (musica.error) {
        return musica;
      }

      const playlistMundial = await PlaylistMundialService.getOne(
        musicaPlaylistMundial.idPlaylist
      );
      // console.log("playlist", playlistMundial)
      if (playlistMundial.error) {
        return playlistMundial;
      }

      const obj = {
        _id: musicaPlaylistMundial._id,
        musica: {
          _id: musica.musica._id,
          nomeMusica: musica.musica.nome,
        },
        playlistMundial: {
          _id: playlistMundial.playMundial._id,
          nomePlaylist: playlistMundial.playMundial.nome,
        },
      };

      return {
        obj,
        code: 200,
        msg: "Musica da playlist mundial encontrada com sucesso",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getByPlaylist: async (id) => {
    try {

      const playlistMundialMusicas = await PlaylistMundialMusic.find({
        idPlaylist : id
      });


      // playlistMundialMusicas.forEach((musicas) => {

      //   console.log(musicas);
        
      //   if(musicas.playlistMundial.id === id){
      //     console.log(musicas)
      //   }
      // })

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
            _id: musica.musica._id,
            nomeMusica: musica.musica.nome,
          },
          playlistMundial: {
            _id: playlistMundial.playMundial._id,
            nomePlaylist: playlistMundial.playMundial.nome,
          },
        };

        arrayDetalhado.push(obj);
      }

      return {
        arrayDetalhado,
        msg: "Todas as musicas da playlist mundial escolhida",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, data) => {
    try {
      const musicaPlaylistMundial = await PlaylistMundialMusic.findById(id);

      if (!musicaPlaylistMundial) {
        return {
          error: true,
          code: 404,
          msg: "Não foi encontrada a musica da playlist mundial",
        };
      }

      // Se mandaram dado para atualizar a musica, validar se existe a musica
      if (data.idMusica) {
        // Validar se existe a musica
        const musica = await MusicaService.getOne(data.idMusica);
        if (musica.error) {
          return {
            error: true,
            code: musica.code,
            msg: musica.msg,
          };
        }

        // Validar se ja existe a musica na playlist
        const musicaPlaylist = await PlaylistMundialMusic.findOne({
          idMusica: data.idMusica,
        });

        if (musicaPlaylist) {
          return {
            error: true,
            code: 400,
            msg: "Essa música ja existe na playlist mundial",
          };
        }
      }

      // Se mandaram dado para atualizar a playlist, validar se existe a playlist
      if (data.idPlaylist) {
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
      }

      return {
        playlistMundialMusica: await musicaPlaylistMundial.updateOne(data),
        code: 200,
        msg: "Musica atualizada na playlist mundial",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
    try {
      const musicaPlaylistMundial = await PlaylistMundialMusic.findById(id);

      if (!musicaPlaylistMundial) {
        return {
          error: true,
          code: 404,
          msg: "Não foi encontrada a musica da playlist mundial",
        };
      }

      return {
        msg: "Musica da playlist mundial deletada com sucesso",
        code: 200,
        musicaPlaylistMundial: await musicaPlaylistMundial.deleteOne(),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistMundialMusicService;
