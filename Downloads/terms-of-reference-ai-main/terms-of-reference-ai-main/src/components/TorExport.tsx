"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check, Download, Copy, Share2, FileText, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TorExportProps {
  content: string;
}

export function TorExport({ content }: TorExportProps) {
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [shareCopied, setShareCopied] = useState(false);

  const handleDownloadDocx = () => {
    // In a real application, this would convert the HTML to a Word document
    // For simplicity, we're just creating a text file with the HTML content
    const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, "terms-of-reference.docx");
  };

  const handleDownloadPdf = () => {
    // In a real application, this would convert the HTML to a PDF
    // For simplicity, we're just creating a text file with the HTML content
    const blob = new Blob([content], { type: "application/pdf" });
    saveAs(blob, "terms-of-reference.pdf");
  };

  const handleDownloadHtml = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Terms of Reference</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          h2 { color: #555; margin-top: 20px; }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, "terms-of-reference.html");
  };

  const handleCopyLink = () => {
    // In a real application, this would generate a shareable link
    // For demo purposes, we're just simulating copying a URL
    navigator.clipboard.writeText("https://terms-of-reference-ai.example.com/shared/doc123");
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleEmailShare = () => {
    // In a real application, this would send an email with the document
    // For demo purposes, we're just showing success
    alert(`Document would be shared with ${emailAddress}`);
    setEmailAddress("");
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          <span className="gradient-text">Export</span> and Share Your Document
        </CardTitle>
        <CardDescription className="text-base">
          Download your Terms of Reference in various formats or share it with stakeholders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="download">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="download" className="flex-1">Download</TabsTrigger>
            <TabsTrigger value="share" className="flex-1">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleDownloadDocx}
                className="flex flex-col items-center justify-center h-32 p-4 card-hover transition-all border border-border/50 bg-card"
                variant="outline"
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <span className="font-medium">Download as Word</span>
              </Button>

              <Button
                onClick={handleDownloadPdf}
                className="flex flex-col items-center justify-center h-32 p-4 card-hover transition-all border border-border/50 bg-card"
                variant="outline"
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-accent/10 mb-3">
                  <FileText className="h-7 w-7 text-accent" />
                </div>
                <span className="font-medium">Download as PDF</span>
              </Button>

              <Button
                onClick={handleDownloadHtml}
                className="flex flex-col items-center justify-center h-32 p-4 card-hover transition-all border border-border/50 bg-card"
                variant="outline"
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-secondary/10 mb-3">
                  <FileText className="h-7 w-7 text-secondary" />
                </div>
                <span className="font-medium">Download as HTML</span>
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="secondary"
                onClick={() => setShowPreviewDialog(true)}
                className="py-6 px-8 bg-muted/60 hover:bg-muted/80 transition-colors"
              >
                <span className="flex items-center font-medium">
                  <FileText className="mr-2 h-5 w-5" />
                  Preview Document
                </span>
              </Button>

              <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto border-none shadow-lg">
                  <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-xl font-bold flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Document Preview
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Preview your Terms of Reference document before downloading
                    </DialogDescription>
                  </DialogHeader>

                  <div className="border rounded-xl p-8 bg-white shadow-sm my-4">
                    {/*
                      NOTE: In a production application, you should:
                      1. Use a proper HTML sanitizer library to prevent XSS attacks
                      2. Consider using a dedicated PDF/DOCX rendering library
                      This simplified preview is just for demonstration purposes
                    */}
                    <div className="tor-preview-content" dangerouslySetInnerHTML={{ __html: content }} />
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={() => setShowPreviewDialog(false)}
                      className="bg-muted/60 hover:bg-muted/80 text-foreground transition-colors"
                      variant="secondary"
                    >
                      Close Preview
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Share Link</h3>
                <div className="flex space-x-2">
                  <Input
                    readOnly
                    value="https://terms-of-reference-ai.example.com/shared/doc123"
                    className="flex-1"
                  />
                  <Button onClick={handleCopyLink} size="icon">
                    {shareCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Share via Email</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="recipient@example.com"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleEmailShare} disabled={!emailAddress}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Share via Social Media</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on LinkedIn
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on Twitter
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
