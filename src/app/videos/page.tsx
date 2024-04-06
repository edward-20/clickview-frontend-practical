'use client';

import { useEffect, useState } from "react";
import { Video } from "@/interfaces/video";
import { isVideoArray } from "@/utils/is-video-array";
import baseUrl from "@/utils/base-url";
import VideoItem from "@/components/video-item";


export default function VideosPage() {
  useEffect(() => {
    let ignore = false;
    const get = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/videos`)
        const data = await response.json()
        if (isVideoArray(data)) {
          if (!ignore) {
            setVideos(data);
          }
        } 
      } catch (err) {
        console.error(err)
      }
    }
    get()
    return () => {ignore = true;}
  }, [])

  const [videos, setVideos] = useState<Video[]|undefined>()
  return (
    <>
      {videos ? 
        <>
          {videos.map(video => {
            return (
              <VideoItem key={video.id} video={video}/>
            )
          })}
        </>
        :
        <>No videos found.</>
      }
    </>
  );
}