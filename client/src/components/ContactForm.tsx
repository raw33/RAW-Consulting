import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiLinkedin } from "react-icons/si";
import Altcha from "@/components/Altcha";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import collaborationImage from "@assets/setting view_1761878541418.png";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [altchaPayload, setAltchaPayload] = useState<string | null>(null);
  const [altchaState, setAltchaState] = useState<string>("unverified");
  const altchaRef = useRef<{ reset: () => void }>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData & { altcha: string }) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      altchaRef.current?.reset();
      setAltchaPayload(null);
      setAltchaState("unverified");
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleAltchaStateChange = (state: any) => {
    setAltchaState(state.state);
    if (state.state === "verified" && state.payload) {
      setAltchaPayload(state.payload);
    }
  };

  const handleSubmit = (data: ContactFormData) => {
    if (!altchaPayload || altchaState !== "verified") {
      toast({
        title: "Verification required",
        description: "Please complete the bot check before sending.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate({ ...data, altcha: altchaPayload });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative order-2 lg:order-1">
            <img
              src={collaborationImage}
              alt="Collaborative workspace - team working together"
              className="w-full h-[600px] lg:h-[700px] object-cover rounded-lg sticky top-24"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Let's Work Together
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Ready to transform your business? Send a message below or connect directly on LinkedIn.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center" data-testid="success-message">
                <h3 className="text-2xl font-semibold mb-3">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out. Rich will be in touch with you soon.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} data-testid="button-send-another">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Company name"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project or goals..."
                            className="min-h-32 resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div data-testid="altcha-container">
                    <label className="block text-sm font-medium mb-3">
                      Verify you're not a robot *
                    </label>
                    <Altcha
                      ref={altchaRef}
                      challengeurl={`${window.location.origin}/api/altcha/challenge`}
                      onStateChange={handleAltchaStateChange}
                      hidefooter={false}
                      hidelogo={false}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitMutation.isPending || altchaState !== "verified"}
                      data-testid="button-submit-contact"
                    >
                      {submitMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>

                    <Button asChild size="lg" variant="outline" data-testid="button-linkedin-message">
                      <a
                        href="https://www.linkedin.com/in/richward3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <SiLinkedin className="w-4 h-4" />
                        Message Rich on LinkedIn
                      </a>
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
