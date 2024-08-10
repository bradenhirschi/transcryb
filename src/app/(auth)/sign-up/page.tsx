import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createServerComponentClient from "@/utils/server/supabase/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { file?: string };
}) {
  const supabase = createServerComponentClient();

  const user = await supabase.auth.getUser();

  if (user) {
    redirect(
      `/dashboard${searchParams.file ? `?file=${searchParams.file}` : ""}`
    );
  }

  const signup = async (formData: FormData) => {
    "use server";
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect(
      `/dashboard${searchParams.file ? `?file=${searchParams.file}` : ""}`
    );
  };

  return (
    <main className="flex flex-col items-center justify-center my-24">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signup} className="flex flex-col gap-2 mb-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <SubmitButton />
          </form>
          <p>
            Already have an account?&nbsp;
            <Link
              href={`/login${
                searchParams.file ? `?file=${searchParams.file}` : ""
              }`}
              className="underline"
            >
              Log In.
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
