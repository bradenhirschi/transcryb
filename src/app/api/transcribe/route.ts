import multer from "multer";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import { promisify } from "util";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { Uploadable } from "openai/src/core.js";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (file === null || typeof file === 'string') {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });
  
    return NextResponse.json({ transcription }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
