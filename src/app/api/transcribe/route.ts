import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import createServerComponentClient from "@/utils/server/supabase/client";
import { UUID } from "crypto";
import createSecretClient from "@/utils/server/supabase/secret-client";

const openai = new OpenAI();

interface TranscriptionRow {
  id: UUID;
  user_email: string;
  transcription: string;
  email_sent: boolean;
  created_at: string;
}

export async function POST(request: NextRequest) {
  const supabase = createSecretClient();

  try {
    const formData = await request.formData();
    const uuid = formData.get("uuid");
    const file = formData.get("file");

    if (file === null || typeof file === "string") {
      return NextResponse.json(
        { error: "Invalid file, cannot transcribe" },
        { status: 500 }
      );
    }

    if (!uuid) {
      return NextResponse.json(
        { error: "File has not been assigned a UUID" },
        { status: 500 }
      );
    }

    const { text: transcription } = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    console.log(uuid);
    const { error } = await supabase
      .from("transcriptions")
      .update({ transcription })
      .eq("id", uuid);

    if (error) {
      console.error("Error transcribing file: ", error);
    }

    return NextResponse.json({ transcription }, { status: 200 });
  } catch (error) {
    console.error("errpr ", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
