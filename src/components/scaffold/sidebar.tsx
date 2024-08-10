import Link from "next/link";
import ThemeChanger from "@/components/ui/theme-select";
import Image from "next/image";
import SignOutButton from "../../app/(app)/sign-out-button";

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen flex flex-col p-4 gap-2 border-r"
      aria-label="Sidebar"
    >
      <Link href="/dashboard">
        <span className="flex items-center space-x-2 text-2xl font-medium text-emerald-500 dark:text-gray-100">
          <span>
            <Image
              src="/img/logo.svg"
              alt="N"
              width="32"
              height="32"
              className="w-8"
            />
          </span>
          <span>Transcryb</span>
        </span>
      </Link>

      <div className="flex flex-grow" />

      <SignOutButton />
      <ThemeChanger />
    </aside>
  );
}
