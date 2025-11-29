import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { DemoFunnel } from "@/components/DemoFunnel";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoFunnel, setShowDemoFunnel] = useState(true);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/contacts", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: data.message,
      });
      return res.json();
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await mutation.mutateAsync(data);
      toast({
        title: "Message Sent",
        description: "We'll get back to you shortly.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Let's Start a <br/><span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Ready to transform your business with AI? Reach out to our team for a consultation or demo.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Headquarters</h3>
                  <p className="text-muted-foreground">7019 River Garden Dr<br/>Houston, TX 77095</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email Us</h3>
                  <p className="text-muted-foreground">mannasolu@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Call Us</h3>
                  <p className="text-muted-foreground">(832) 803-8840</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {showDemoFunnel && (
              <DemoFunnel onConsultationClick={() => setShowDemoFunnel(false)} />
            )}

            {!showDemoFunnel && (
              <>
                <Card className="border-white/10 bg-secondary/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Request a Consultation</CardTitle>
                    <CardDescription>Fill out the form below and we'll respond within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">First Name</label>
                          <Input {...register("firstName")} placeholder="Jane" className="bg-background/50 border-white/10" data-testid="input-consultation-firstname" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Last Name</label>
                          <Input {...register("lastName")} placeholder="Doe" className="bg-background/50 border-white/10" data-testid="input-consultation-lastname" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Email</label>
                        <Input {...register("email")} type="email" placeholder="jane@company.com" className="bg-background/50 border-white/10" data-testid="input-consultation-email" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Subject</label>
                        <Input {...register("subject")} placeholder="Project Inquiry" className="bg-background/50 border-white/10" data-testid="input-consultation-subject" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Message</label>
                        <Textarea {...register("message")} placeholder="Tell us about your project needs..." className="min-h-[150px] bg-background/50 border-white/10" data-testid="input-consultation-message" />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowDemoFunnel(true)}
                          className="flex-1 border-white/10"
                          data-testid="button-back-demo"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isSubmitting} data-testid="button-submit-consultation">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
