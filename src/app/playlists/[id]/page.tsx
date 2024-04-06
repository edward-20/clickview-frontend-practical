'use client';
import React, { useEffect, useState } from "react";
import { Video } from "@/interfaces/video";
import { isVideoArray } from "@/utils/is-video-array";
import { isPlaylistArray } from "@/utils/is-playlist-array";
import VideoItem from "@/components/video-item";
import baseUrl from "@/utils/base-url";
import { Heading3 } from "lucide-react";

export default function Page({params} : { params: { id: number }}) {
  useEffect(() => {
    let ignore = false;
    const get = async () => {
      try {
        // get the playlists
        const playlistsResponse = await fetch(`${baseUrl}/api/playlists`, {
          method: 'GET'
        });
        const playlistsData = await playlistsResponse.json();
        let videoIds : number[] = [];

        // find which playlist has the video ids
        if (isPlaylistArray(playlistsData)) {
          for (let i = 0; i < playlistsData.length; i++) {
            const playlist = playlistsData[i];
            if (playlist.id == params.id) {
              // acquire the video ids of the videos in the playlist
              videoIds = playlist.videoIds;
              if (!ignore) {
                setName(playlist.name)
              }
              break;
            }
          }
        } 

        // get the videos
        const videosResponse = await fetch(`${baseUrl}/api/videos`, {
          method: 'GET'
        });
        const videosData = await videosResponse.json();
        if (isVideoArray(videosData)) {
          for (let i = 0; i < videosData.length; i++) {
            const video = videosData[i];
            // if we find a video such that its id belongs to the list of ids we should be taking from
            // append it to the state variable
            if (videoIds.includes(video.id)) {
              if (!ignore) {
                setVideos(prev => [...prev, video])
              }
            }
          }
        }
      } catch (err) {
        setVideos([])
        console.error(err)
      }
    }
    get()
    return () => {ignore = true}
  }, [])

  const [name, setName] = useState<string>("")
  const [videos, setVideos] = useState<Video[]>([])

  return (
    <>
      <h1>{name}</h1>
      {videos.map(video => {
        return (
          <VideoItem key={video.id} video={video}/>
        )
      })}
      {videos.length === 0 && 
        <>
        <p>There are no videos in this playlist.</p>
        </>
      }
    </>
  )
}