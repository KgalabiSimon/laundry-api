"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TorGeneratorForm } from "@/components/TorGeneratorForm";
import { TorEditor } from "@/components/TorEditor";
import { TorExport } from "@/components/TorExport";
import type { TorFormData } from "@/types";

export function TermsOfReferenceGenerator() {
  const [documentContent, setDocumentContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("generate");

  const handleGenerateDocument = async (formData: TorFormData) => {
    setIsGenerating(true);

    try {
      // This would typically call an API that connects to an AI service
      // For now, we'll simulate a response with a basic TOR template
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      const simulatedAIResponse = `
        <h1>Terms of Reference: ${formData.projectTitle}</h1>
        <h2>1. Introduction</h2>
        <p>${formData.organization} is seeking to ${formData.projectPurpose}.</p>

        <h2>2. Background</h2>
        <p>${formData.projectBackground}</p>

        <h2>3. Objectives</h2>
        <p>The main objectives of this project are:</p>
        <ul>
          <li>To develop and implement ${formData.projectTitle}</li>
          <li>To ensure the quality and effectiveness of the deliverables</li>
          <li>To maintain project timeline and budget constraints</li>
        </ul>

        <h2>4. Scope of Work</h2>
        <p>${formData.scopeOfWork}</p>

        <h2>5. Deliverables</h2>
        <p>The expected deliverables for this project include:</p>
        <ul>
          <li>Initial project plan and timeline</li>
          <li>Regular progress reports</li>
          <li>Final implementation of the project</li>
        </ul>

        <h2>6. Timeline</h2>
        <p>The project is expected to be completed by ${formData.projectDeadline}.</p>

        <h2>7. Budget</h2>
        <p>The approved budget for this project is ${formData.budget}.</p>

        <h2>8. Reporting</h2>
        <p>The consultant/contractor will report to ${formData.reportingPerson}.</p>
      `;

      setDocumentContent(simulatedAIResponse);
      setActiveTab("edit");
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-xl shadow-lg subtle-shadow overflow-hidden bg-card animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b rounded-none bg-muted/40 p-1">
          <TabsTrigger
            value="generate"
            className="flex-1 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            Generate
          </TabsTrigger>
          <TabsTrigger
            value="edit"
            className="flex-1 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all"
            disabled={!documentContent}
          >
            Edit
          </TabsTrigger>
          <TabsTrigger
            value="export"
            className="flex-1 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all"
            disabled={!documentContent}
          >
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="p-6 animate-slide-up">
          <TorGeneratorForm
            onSubmit={handleGenerateDocument}
            isLoading={isGenerating}
          />
        </TabsContent>

        <TabsContent value="edit" className="p-6 animate-slide-up">
          <TorEditor
            content={documentContent}
            onChange={setDocumentContent}
          />
        </TabsContent>

        <TabsContent value="export" className="p-6 animate-slide-up">
          <TorExport content={documentContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
