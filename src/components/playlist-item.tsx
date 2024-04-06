import { Col, Row } from 'react-bootstrap';
import { Playlist } from '../interfaces/playlist';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import baseUrl from '@/utils/base-url';
import React from 'react';

interface PlaylistItemProps {
  playlist: Playlist;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist } = props;

  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/playlists/${playlist.id}`)
  }

  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  const handleDeletePlaylist = (event) => {
    event.stopPropagation();
    const id = playlist.id;
    fetch(`${baseUrl}/api/playlists`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    .then(response => {
      console.log(response.status);
      if (response.status !== 200) {
        throw new Error('Failed to delete playlist.')
      }
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
      <Row className='border rounded p-2 mb-2 clickable' onClick={handleClick}>
        <Col xs='12' md='3'>
          <h2 className='h5'>{playlist.name}</h2>
          <p className='mb-0'>{videoCount}</p>
        </Col>
        <Col xs='12' md='9'>
          <p className='mb-2'>{playlist.description}</p>
          <Button onClick={handleDeletePlaylist} variant="destructive">Delete</Button>
        </Col>
      </Row>
  )
}