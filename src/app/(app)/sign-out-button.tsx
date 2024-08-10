"use client"

import { Button } from "@/components/ui/button";
import createClientComponentClient from "@/utils/client/supabase/client";
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  
  const signOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    router.push('https://transcryb---voice-memo-to-text.webflow.io');
  };

  return <Button onClick={signOut}>Sign Out</Button>;
}
