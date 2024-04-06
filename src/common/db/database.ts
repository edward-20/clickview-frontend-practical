import { Playlist } from '@/interfaces/playlist';
import { Video } from '@/interfaces/video';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import crypto from "crypto";

interface newPlaylistDetails {
  name: string,
  description: string
}
export const Database = {
  getPlaylists: (): Playlist[] => {
    return require('./playlists.json');
  },
  getVideos: (): Video[] => {
    return require('./videos.json');
  },
  putPlaylists: (data : Playlist[]) : void => {
    fs.writeFileSync('./src/common/db/playlists.json', JSON.stringify(data));
  },
  addPlayist: (data: newPlaylistDetails): void => {
    const currentPlaylist = require('./playlists.json');
    const id = uuidv4();
    const hash = parseInt(crypto.createHash('md5').update(id).digest('hex'), 16);
    const newPlaylist = {...data, id: hash % 1000000, videoIds: []};
    currentPlaylist.push(newPlaylist);
    fs.writeFileSync('./src/common/db/playlists.json', JSON.stringify(currentPlaylist));
  },
  deletePlaylist: (data: number): void => {
    const currentPlaylist: Playlist[] = require('./playlists.json');
    const delPlaylistIndex = currentPlaylist.findIndex((pl) => pl.id === data)
    if (delPlaylistIndex !== - 1) {
      currentPlaylist.splice(delPlaylistIndex, 1);
    } else {
      throw new Error("Couldn't find playlist.");
    }
    fs.writeFileSync('./src/common/db/playlists.json', JSON.stringify(currentPlaylist));
  }
}