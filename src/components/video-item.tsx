import { Col, Image, Row, Button } from 'react-bootstrap';
import { Video } from '../interfaces/video';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlaylistPicker } from './playlist-picker';

interface VideoItemProps {
  video: Video;
}

export default function VideoItem(props: VideoItemProps) {
  const { video } = props;

  return (
    <Row className='clickable'>
      <Col xs='12' md='3' className='mb-3'>
        <Image fluid rounded src={`${video.thumbnail}?size=small`} alt={video.name} className='w-100' />
      </Col>
      <Col xs='12' md='9' className='mb-3'>
        <h2 className='h4'>{video.name}</h2>
        <p>{video.description}</p>
        <Dialog>
          <DialogTrigger>
            <Button className='mb-3'>Add to Playlist</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mb-3'>Which playlist/s would you like the video to belong to?</DialogTitle>
              <PlaylistPicker video={video}/>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Col>
    </Row>
  )
}