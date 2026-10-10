"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ClayCard, IconTile } from "@/components/clay/clay-card";
import { Section } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const emptyForm = { name: "", email: "", subject: "", message: "" };

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [formData, setFormData] = useState(emptyForm);

  const update =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((p) => ({ ...p, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setFormState({ status: "success", message: data.message || "Message sent successfully!" });
      setFormData(emptyForm);
    } catch {
      setFormState({ status: "error", message: "Failed to send message. Please try again." });
    }
  }

  return (
    <Section
      id="contact"
      title="Get In Touch"
      description="Have a question or want to connect? Send me a message."
    >
      <div className="mx-auto max-w-2xl">
        <ClayCard className="p-6 md:p-8">
          {formState.status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <IconTile size="lg" className="bg-tone-mint animate-float">
                <CheckCircle className="size-7" aria-hidden="true" />
              </IconTile>
              <h3 className="font-heading text-2xl font-bold text-foreground">Message Sent!</h3>
              <p className="text-muted-foreground" role="status">
                {formState.message}
              </p>
              <Button
                variant="secondary"
                onClick={() => setFormState({ status: "idle", message: "" })}
                className="mt-2"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={update("name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={update("email")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={update("subject")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={update("message")}
                  className="resize-none"
                />
              </div>

              {formState.status === "error" && (
                <div
                  role="alert"
                  className="clay-inset flex items-center gap-2 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive"
                >
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  {formState.message}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={formState.status === "loading"}
              >
                {formState.status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </ClayCard>
      </div>
    </Section>
  );
}
