"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { TorFormData } from "@/types";

interface TorGeneratorFormProps {
  onSubmit: (data: TorFormData) => void;
  isLoading: boolean;
}

export function TorGeneratorForm({ onSubmit, isLoading }: TorGeneratorFormProps) {
  const form = useForm({
    defaultValues: {
      projectTitle: "",
      organization: "",
      projectPurpose: "",
      projectBackground: "",
      scopeOfWork: "",
      projectDeadline: "",
      budget: "",
      reportingPerson: "",
    },
  });

  const handleSubmit = (data: TorFormData) => {
    onSubmit(data);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          <span className="gradient-text">Generate</span> Terms of Reference
        </CardTitle>
        <CardDescription className="text-base">
          Fill in the details below to generate a professional Terms of Reference document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Your organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Purpose</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief purpose of the project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Deadline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. December 31, 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $50,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportingPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reporting Person/Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Project Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="projectBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Background</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed background about the project"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scopeOfWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope of Work</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the scope of work in detail"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition-all py-6 text-base font-semibold shadow-md group relative overflow-hidden"
              disabled={isLoading}
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-primary to-accent opacity-30 group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Document...
                  </>
                ) : (
                  "Generate Document"
                )}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
