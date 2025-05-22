import { Header } from "@/components/Header";
import { TermsOfReferenceGenerator } from "@/components/TermsOfReferenceGenerator";
import { FileCheck, Sparkles, PenTool, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,hsl(221,83%,53%),transparent_70%),radial-gradient(circle_at_top_right,hsl(262,83%,58%),transparent_70%)]" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                <span className="gradient-text">Terms of Reference</span> <br />
                AI Generator
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Create, edit, and share professional Terms of Reference documents in minutes with the power of AI assistance.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="flex items-start gap-2 animate-slide-up delay-100">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">AI-powered document generation</p>
                </div>
                <div className="flex items-start gap-2 animate-slide-up delay-200">
                  <PenTool className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Easy document editing</p>
                </div>
                <div className="flex items-start gap-2 animate-slide-up delay-300">
                  <FileCheck className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Professional templates</p>
                </div>
                <div className="flex items-start gap-2 animate-slide-up delay-400">
                  <Share2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Multiple export options</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative animate-fade-in">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-accent opacity-30 blur-xl" />
              <div className="relative h-64 w-full rounded-xl bg-card shadow-xl border overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 bg-muted/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="pt-12 px-6">
                  <div className="h-8 w-2/3 rounded-md bg-muted mb-4" />
                  <div className="h-4 w-full rounded-sm bg-muted/70 mb-2" />
                  <div className="h-4 w-5/6 rounded-sm bg-muted/70 mb-2" />
                  <div className="h-4 w-4/6 rounded-sm bg-muted/70 mb-4" />
                  <div className="h-10 rounded-md bg-primary/20 mb-4" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 rounded-md bg-muted/80" />
                    <div className="h-8 rounded-md bg-muted/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container py-8">
        <TermsOfReferenceGenerator />
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Terms of Reference AI Generator | All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
