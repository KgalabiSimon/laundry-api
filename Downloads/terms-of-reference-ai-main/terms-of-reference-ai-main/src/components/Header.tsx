"use client";

import { FileText } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b gradient-bg shadow-md">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <Link href="/" className="font-bold text-white text-lg tracking-tight">
            Terms of Reference AI
          </Link>
        </div>
        <nav className="ml-auto flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
}
