import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Mail, Phone, Clock } from "lucide-react";

const services = [
  "Business Development",
  "Web App MVP Development",
  "Social Media & Marketing",
  "Executive Coaching",
  "Other"
];

interface ContactFormProps {
  onSubmit?: (data: InsertContactSubmission) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  });

  const handleSubmit = async (data: InsertContactSubmission) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    if (onSubmit) {
      onSubmit(data);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Let's Get Started
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business? Schedule a free consultation to discuss your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
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
                          placeholder="Your company name" 
                          {...field} 
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interest</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? "Sending..." : "Get Started"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your information is secure and never shared
                </p>
              </form>
            </Form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <a 
                      href="mailto:contact@rawconsulting.com" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-email"
                    >
                      contact@rawconsulting.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Phone</div>
                    <a 
                      href="tel:+15551234567" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-phone"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Response Time</div>
                    <p className="text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h4 className="font-medium mb-3">What Happens Next?</h4>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">1.</span>
                  <span>We'll review your information and goals</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Schedule a free 30-minute consultation call</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Discuss your needs and create an action plan</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
