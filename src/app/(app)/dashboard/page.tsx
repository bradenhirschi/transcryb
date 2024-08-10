import PageHeader from "@/components/scaffold/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import createServerComponentClient from "@/utils/server/supabase/client";
import createSecretClient from "@/utils/server/supabase/secret-client";
import Link from "next/link";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { file?: string };
}) {
  const supabase = createServerComponentClient();
  const secretClient = createSecretClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>Error fetching user</>;
  }

  if (searchParams.file && user) {
    const { error } = await secretClient
      .from("transcriptions")
      .update({ user_id: user.id })
      .eq("id", searchParams.file);

    if (error) {
      console.error("Error updating file:", error.message);
    } else {
      console.log("File updated successfully");
    }
  }

  const { data: transcriptions } = await supabase
    .from("transcriptions")
    .select()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main>
      <PageHeader title="Transcriptions" />
      <section className="p-4 grid grid-cols-4 gap-4 bg-secondary">
        {transcriptions?.map((transcription) => (
          <Card key={transcription.id}>
            <Link href={`/transcription/${transcription.id}`}>
              <CardHeader>
                <CardTitle>{transcription.name}</CardTitle>
                <CardDescription>
                  {new Date(transcription.created_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
            </Link>

            <CardContent>
              {transcription.transcription ? (
                <p className="line-clamp-3">{transcription.transcription}</p>
              ) : (
                <p>Please wait while this recording is being transcribed</p>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
