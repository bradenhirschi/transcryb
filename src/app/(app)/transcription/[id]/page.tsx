import PageHeader from "@/components/scaffold/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import createServerComponentClient from "@/utils/server/supabase/client";

export default async function TranscriptionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient();

  const { data: transcription } = await supabase
    .from("transcriptions")
    .select()
    .eq("id", id)
    .single();

  return (
    <main>
      <PageHeader
        title={`Transcription of file "${transcription.name}"`}
        subtitle={`Created ${new Date(
          transcription.created_at
        ).toLocaleString()}`}
      />
      <section className="p-4 bg-secondary">
        <Card>
          <CardHeader>
            <CardTitle>{transcription.name}</CardTitle>
            <CardDescription>
              {new Date(transcription.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p>{transcription.transcription}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
