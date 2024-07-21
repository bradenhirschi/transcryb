import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import createServerComponentClient from "@/utils/server/supabase/client";
import { UUID } from "crypto";

const openai = new OpenAI();

interface TranscriptionRow {
  id: UUID;
  user_email: string;
  transcription: string;
  email_sent: boolean;
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (file === null || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid file, cannot transcribe' }, { status: 500 })
    }

    const supabase = createServerComponentClient();

    const transcriptionObj = {
      user_email: 'bradenhirschi29@gmail.com',
    }

    const {data, error, status} = await supabase.from('transcriptions').insert(transcriptionObj).select();

    console.log(data);

    // const transcription = {text: 'yee'};

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });
  
    return NextResponse.json({ transcription }, { status: 200 });
  } catch (error) {
    console.error('errpr ',error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}
