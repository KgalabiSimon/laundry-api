"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Dynamically import ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 border rounded-md bg-muted/20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface TorEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TorEditor({ content, onChange }: TorEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  // Handle SSR for React Quill
  useEffect(() => {
    setMounted(true);
    setEditorContent(content);
  }, [content]);

  const handleChange = (value: string) => {
    setEditorContent(value);
    onChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          <span className="gradient-text">Edit</span> Your Terms of Reference
        </CardTitle>
        <CardDescription className="text-base">
          Customize and refine the AI-generated document using the editor below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mounted && (
          <div className="min-h-[500px] flex flex-col">
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleChange}
              modules={modules}
              className="flex-1 min-h-[450px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
