'use client';
import { useEffect, useState } from "react";
import { PlaylistItem } from "@/components/playlist-item";
import { Playlist } from "@/interfaces/playlist";
import { isPlaylistArray } from "@/utils/is-playlist-array";
import { AddPlaylist } from "@/components/add-playlist";
import baseUrl from "@/utils/base-url";

// user defined type guard

export default function PlaylistsPage() {
  // fetch all the playlists
  useEffect(() => {
    let ignore = false;
    const get = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/playlists`, {
          method: 'GET'
        })
        const data = await response.json()
        console.log(data);
        if (isPlaylistArray(data)) {
          if (!ignore) {
            setPlaylists(data);
          }
        } 
      } catch (err) {
        console.error(err)
      }
    }
    get()
    return () => {ignore = true;}
  }, [])

  const [playlists, setPlaylists] = useState<Playlist[]|undefined>();

  // render each playlist
  return (
    <>
      {playlists ?
        <>
          {playlists.map((pl) => {
            return (
              <>
                <PlaylistItem key={pl.id} playlist={pl}/>
              </>
            )
          })}
        </>
        :
        <>No playlists found.</>
      }
      {
        <AddPlaylist/>
      }
    </>
  );
}