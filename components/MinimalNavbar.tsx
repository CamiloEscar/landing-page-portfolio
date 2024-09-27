"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "next-themes";

const ProfessionalNavbar = () => {
  const { setTheme, theme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="print:hidden flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <Link href="/">
        <span className="text-gray-600 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white">Inicio</span>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={cycleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => window.open("/cv-camilo.pdf", "_blank")}>
          <Download className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;