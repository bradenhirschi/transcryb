"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure that the component is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant={"outline"} disabled />;
  }

  return (
    <>
      {theme === "light" ? (
        <Button
          onClick={() => setTheme("dark")}
          variant={"outline"}
          className="flex flex-row w-full gap-2"
        >
          Light Mode
          <Sun />
        </Button>
      ) : (
        <Button
          onClick={() => setTheme("light")}
          variant={"outline"}
          className="flex flex-row w-full gap-2"
        >
          Dark Mode
          <Moon />
        </Button>
      )}
    </>
  );
}
