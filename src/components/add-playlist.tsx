import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import baseUrl from "@/utils/base-url";

export function AddPlaylist() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleAddPlaylist = () => {
    if (!name || !description) {
      return;
    }
    const post = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/playlists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            description
          })
        })
        if (response.status === 201) {
        } else if (response.status === 500) {
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    post();
  }

  return (
    <>
      <Button onClick={handleOpen}>Add a playlist</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader> <DialogTitle>What's your new playlist?</DialogTitle> </DialogHeader>
          <Input type="text" placeholder="Name" onChange={handleNameChange}/> 
          <Textarea placeholder="Description" onChange={handleDescriptionChange}/>
          <DialogClose onClick={handleAddPlaylist} className="border-solid rounded-sm bg-sky-500 py-1">Create</DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}