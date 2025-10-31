import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  "Fractional CEO",
  "Fractional CFO",
  "Fractional CMO",
  "Fractional HR",
  "Fractional Legal",
  "Business Development",
  "Web App MVP Development",
  "Social Media & Marketing",
  "Executive Coaching",
  "Other"
];

export default function ContactForm() {
  const [humanVerified, setHumanVerified] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: undefined,
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });
      form.reset();
      setHumanVerified(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: InsertContactSubmission) => {
    if (!humanVerified) {
      toast({
        title: "Verification Required",
        description: "Please confirm you're human to submit the form.",
        variant: "destructive",
      });
      return;
    }
    
    submitContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Ready to transform your business? Get in touch to discuss your goals.
          </p>
        </div>

        <div className="max-w-3xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          data-testid="input-name"
                        />
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
                name="serviceInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Interest</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                      key={field.value || 'empty'}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className="flex items-start gap-3 pt-2">
                <Checkbox 
                  id="human-verify"
                  checked={humanVerified}
                  onCheckedChange={(checked) => setHumanVerified(checked === true)}
                  data-testid="checkbox-verify-human"
                />
                <label 
                  htmlFor="human-verify" 
                  className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                >
                  I'm a human and not a bot *
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto px-12" 
                size="lg"
                disabled={submitContactMutation.isPending || !humanVerified}
                data-testid="button-submit-contact"
              >
                {submitContactMutation.isPending ? "Sending..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
