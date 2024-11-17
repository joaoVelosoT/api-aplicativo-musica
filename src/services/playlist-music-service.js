const PlaylistMusic = require("../models/Playlist-Music");
const MusicaService = require("./musica-service");
const PlaylistService = require("./playlist-service");

const PlaylistMusicService = {
  create: async (data, idUsuario) => {
    try {
      // Validar se existe a musica
      // console.log("id no service play",data.idMusica)
      const existeMusica = await MusicaService.getOne(data.idMusica);
      // console.log(existeMusica);
      
      if (existeMusica.error) {
        return existeMusica
      }

      // Validar se existe a playlist

      const existePlaylist = await PlaylistService.getOne(
        data.idPlaylist,
        idUsuario
      );

      console.log(existePlaylist);

      if (!existePlaylist) {
        return {
          error: true,
          msg: "Playlist não encontrada",
        };
      }

      // Validar se existe já existe a musica na playlist
      const musicasPlaylist = await PlaylistMusicService.getByPlaylist(idUsuario, data.idPlaylist);
      if(musicasPlaylist.error){
        return musicasPlaylist
      }
      // const existeMusicPlaylist = () => {
      //   var retorno = null;
      //   musicasPlaylist.filter((musica) => {
      //     if (musica.idMusica === existeMusica.id) {
      //       return (retorno = true);
      //     }
      //   });
      //   return retorno;
      // };

      // Se a musica ja existe na playlist, devolver mensagem de erro

      musicasPlaylist.forEach((musica) => {
        console.log(musica);
      })

      // if (existeMusicPlaylist()) {
      //   return {
      //     error: true,
      //     msg: "Essa musica ja existe na playlist",
      //   };
      // }

      data.idUsuario = idUsuario;
      const playlistMusic = await PlaylistMusic.create(data);
      return {
        _id: playlistMusic._id,
        playlist: {
          idPlaylist: existePlaylist.playlist._id,
          nomePlaylist: existePlaylist.playlist.nomePlaylist,
        },
        musica: {
          idMusica: existeMusica._id,
          nomeMusica: existeMusica.nome,
        },
        user: {
          idUser: existePlaylist.user._id,
          nomeUser: existePlaylist.user.nomeUsuario,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      // Pegando todas as musicas de todas as playlist
      const playlistMusic = await PlaylistMusic.find({ idUsuario: idUsuario });

      // Criando uma array para colocar os dados detalhados
      const playlistMusicDetalhada = [];

      // Iniciando um for para percorrer cada dados e adicionar o detalhe a cada um
      for (const playMusic of playlistMusic) {
        const playlist = await PlaylistService.getOne(
          playMusic.idPlaylist,
          idUsuario
        );

        const musica = await MusicaService.getOne(playMusic.idMusica);

        if (!playlist.error) {
          const obj = {
            _id: playMusic._id,
            playlist: {
              idPlaylist: playlist.playlist._id,
              nomePlaylist: playlist.playlist.nomePlaylist,
            },
            musica: {
              idMusica: musica._id,
              nomeMusica: musica.nome,
            },
            user: {
              idUser: playlist.user._id,
              nomeUser: playlist.user.nomeUsuario,
            },
          };

          playlistMusicDetalhada.push(obj);
        }
      }

      return playlistMusicDetalhada;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (idUsuario, id) => {
    try {
      const playMusic = await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });

      const musica = await MusicaService.getOne(playMusic.idMusica);

      if (!musica) {
        return {
          error: true,
          code: 404,
          msg: "Musica não encontrada",
        };
      }

      const playlist = await PlaylistService.getOne(
        playMusic.idPlaylist,
        idUsuario
      );

      return {
        _id: playMusic._id,
        playlist: {
          idPlaylist: playlist.playlist._id,
          nomePlaylist: playlist.playlist.nomePlaylist,
        },
        musica: {
          idMusica: musica._id,
          nomeMusica: musica.nome,
        },
        user: {
          idUser: playlist.user._id,
          nomeUser: playlist.user.nomeUsuario,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (idUsuario, id, data) => {
    try {
      // Validar se existe a musica
      if (data.idMusica) {
        var existeMusica = await MusicaService.getOne(data.idMusica);
        console.log(existeMusica);
        if (!existeMusica) {
          return {
            error: true,
            msg: "Musica não encontrada",
          };
        }
      }

      // Validar se existe a playlist
      if (data.idPlaylist) {
        var existePlaylist = await PlaylistService.getOne(
          data.idPlaylist,
          idUsuario
        );
        if (!existePlaylist) {
          return {
            error: true,
            msg: "Playlist não encontrada",
          };
        }
      }

      // Validar se existe já existe a musica na playlist
      const musicasPlaylist = await PlaylistMusicService.getAll(idUsuario);
      const existeMusicPlaylist = () => {
        var retorno = null;
        musicasPlaylist.filter((musica) => {
          if (musica.idMusica === existeMusica.id) {
            return (retorno = true);
          }
        });
        return retorno;
      };

      // Se a musica ja existe na playlist, devolver mensagem de erro
      if (existeMusicPlaylist()) {
        return {
          error: true,
          msg: "Essa musica ja existe na playlist",
        };
      }
      const playMusic = await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });

      if (!playMusic) {
        return {
          error: true,
          msg: "Não foi encontrada a musica na playlist",
        };
      }

      return playMusic.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (idUsuario, id) => {
    try {
      const playMusic = await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });

      if (!playMusic) {
        return {
          error: true,
          msg: "Não foi encontrada a musica na playlist",
        };
      }

      return await playMusic.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getByPlaylist: async (idUsuario, idPlaylist) => {
    try {
      // Pegando todas as musicas de todas as playlist
      const playlistMusic = await PlaylistMusic.find({
        idUsuario: idUsuario,
        idPlaylist: idPlaylist,
      });

      // Criando uma array para colocar os dados detalhados
      const playlistMusicDetalhada = [];

      // Iniciando um for para percorrer cada dados e adicionar o detalhe a cada um
      for (const playMusic of playlistMusic) {
        const playlist = await PlaylistService.getOne(
          playMusic.idPlaylist,
          idUsuario
        );

        const musica = await MusicaService.getOne(playMusic.idMusica);

        if(musica.error){
          return musica
        }

        console.log(musica);
        if (!playlist.error) {
          const obj = {
            _id: playMusic._id,
            playlist: {
              idPlaylist: playlist.playlist._id,
              nomePlaylist: playlist.playlist.nomePlaylist,
            },
            musica: {
              idMusica: musica._id,
              nomeMusica: musica.nome,
            },
            user: {
              idUser: playlist.user._id,
              nomeUser: playlist.user.nomeUsuario,
            },
          };

          playlistMusicDetalhada.push(obj);
        }
      }

      // console.log(playlistMusicDetalhada);
      return playlistMusicDetalhada;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistMusicService;
