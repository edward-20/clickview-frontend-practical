import { Database } from '@/common/db/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Database.getPlaylists();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({error: 'Unable to get playlists.'}, { status: 400 })
  }
}

// method name is not entirely representative of action
// we will be replacing the entire playlist database json in this method
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    Database.putPlaylists(body)
    return NextResponse.json({message: 'Successfully put playlists.'}, {status:201});
  } catch (err) {
    return NextResponse.json({message: 'Unable to put playlists.'}, {status:500});
  }
}

// method name is representative of action but doesn't align with convention implied from PUT
// add a new empty playlist
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    Database.addPlayist(body);
    return NextResponse.json({message: 'Successfully post playlist.'}, {status: 201});
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: 'Unable to post playlist.'}, {status:500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    Database.deletePlaylist(body.id);
    return Response.json({message: "Successfully deleted playlist."}, {status: 200}); // doesn't let me use 204 because there is json
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: 'Unable to delete playlist.'}, {status: 500});
  }
}