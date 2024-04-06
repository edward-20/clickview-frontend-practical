'use client';
import { Video } from "@/interfaces/video";
import { isPlaylistArray } from "@/utils/is-playlist-array";
import { Playlist } from '@/interfaces/playlist';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Button, NavItem } from "react-bootstrap";
import { DialogClose } from "@radix-ui/react-dialog";
import baseUrl from "@/utils/base-url";

interface VideoItemProps {
  video: Video;
}

export function PlaylistPicker(props: VideoItemProps) {
  const { video } = props;

  useEffect(() => {
    // determine all the playlists out there
    let ignore = false;
    const get = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/playlists', {
          method: 'GET'
        })
        const playlistsData = await response.json();
        if (isPlaylistArray(playlistsData)) {
          if (!ignore) {
            setPlaylists(playlistsData);
          }
        } 
      } catch (err) {
        console.error(err);
      }
    }
    get()

    return () => {
      ignore = true;
    }
  }, [])

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleChangePlaylistMembership: ChangeEventHandler<HTMLInputElement> = (event) => {
    // get the playlist id for which the 
    const isChecked = event.target.checked;
    const playlistId = event.target.id;

    // copy of the array of the playlists
    let playlistsCopy = playlists;
    const indexOfPlaylistToModify = playlistsCopy.findIndex(pl => pl.id === Number(playlistId));

    // copy of the playlist for which we want to change the videos membership status
    let playlistCopy = playlistsCopy[indexOfPlaylistToModify]
    const indexOfVideoInPlaylist = playlistCopy.videoIds.indexOf(video.id);

    // if the video was not found in the playlist and we want to add it then add it
    if (indexOfVideoInPlaylist === -1 && isChecked) {
      playlistCopy.videoIds.push(video.id);
    } 
    // if the video is in the array and we want to remove it then remove it
    else if (indexOfPlaylistToModify !== -1 && !isChecked) {
      playlistCopy.videoIds.splice(indexOfVideoInPlaylist, 1);
    }
    
    playlistsCopy[indexOfPlaylistToModify] = playlistCopy;

    console.log(playlistsCopy);
    setPlaylists(playlistsCopy);
  }

  const handleSubmit = () => {
    const put = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/playlists`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(playlists)
        });
        if (response.status === 201) {
          const message = await response.json();
          console.log(message);
        } else if (response.status === 500) {
          const message = await response.json();
          throw new Error(message);
        }
      } catch (error) {
        alert(error);
      }
    }
    put()
  }

  return (
    <div className="flex-col items-start">
      {playlists.map((item) => {
        return (
          <div>
            <input className="mr-2" id={String(item.id)} type="checkbox" defaultChecked={item.videoIds.includes(video.id)} onChange={handleChangePlaylistMembership}/>
            <label htmlFor={String(item.id)}>{item.name}</label>
          </div>
        )
      })}

      {playlists &&
        <>
          <DialogClose>
            <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
          </DialogClose>
        </>
      }

    </div>
  )
}