import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, MessageSquare, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DemoFunnelProps {
  onConsultationClick: () => void;
}

export function DemoFunnel({ onConsultationClick }: DemoFunnelProps) {
  const [step, setStep] = useState<"choice" | "form">("choice");
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm();
  const { toast } = useToast();

  const demoMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/demo-requests", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        jobTitle: data.jobTitle,
        industry: data.industry,
        companySize: data.companySize,
        timeline: data.timeline,
        budget: data.budget,
        challenges: data.challenges,
        consultationNotes: data.consultationNotes,
      });
      return res.json();
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await demoMutation.mutateAsync(data);
      toast({
        title: "Demo Request Submitted",
        description: "We'll be in touch shortly to schedule your demo!",
      });
      // Reset form and go back to choice
      setStep("choice");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (step === "choice") {
    return (
      <div className="space-y-4">
        <Card className="border-white/10 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setStep("form")}>
          <CardContent className="p-8 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Video className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg mb-1">Request a Demo</h3>
              <p className="text-sm text-muted-foreground">
                See our AI/ML solutions in action with a personalized walkthrough
              </p>
            </div>
            <Button size="lg" className="flex-shrink-0" data-testid="button-demo-choice">
              Let's Start
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer" onClick={onConsultationClick}>
          <CardContent className="p-8 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg mb-1">General Inquiry</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions or discuss your specific needs with our team
              </p>
            </div>
            <Button size="lg" variant="outline" className="flex-shrink-0 border-white/10" data-testid="button-consultation-choice">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="border-white/10 bg-secondary/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Demo Request Form</CardTitle>
        <CardDescription>Tell us about your organization so we can prepare the perfect demo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">First Name *</label>
              <Input
                {...register("firstName", { required: true })}
                placeholder="Jane"
                className="bg-background/50 border-white/10"
                data-testid="input-demo-firstname"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Last Name *</label>
              <Input
                {...register("lastName", { required: true })}
                placeholder="Doe"
                className="bg-background/50 border-white/10"
                data-testid="input-demo-lastname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email *</label>
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="jane@company.com"
              className="bg-background/50 border-white/10"
              data-testid="input-demo-email"
            />
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Company Name</label>
              <Input
                {...register("company")}
                placeholder="Acme Inc."
                className="bg-background/50 border-white/10"
                data-testid="input-demo-company"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Job Title</label>
              <Input
                {...register("jobTitle")}
                placeholder="Decision Maker"
                className="bg-background/50 border-white/10"
                data-testid="input-demo-jobtitle"
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Industry</label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange} data-testid="select-demo-industry">
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Company Size</label>
              <Controller
                name="companySize"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange} data-testid="select-demo-size">
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Needs & Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Timeline</label>
              <Controller
                name="timeline"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange} data-testid="select-demo-timeline">
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASAP">ASAP</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6+ months">6+ months</SelectItem>
                      <SelectItem value="Exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Budget Range</label>
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange} data-testid="select-demo-budget">
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50k">Under $50k</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                      <SelectItem value="100k-500k">$100k - $500k</SelectItem>
                      <SelectItem value="over-500k">Over $500k</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">What challenges are you facing?</label>
            <Textarea
              {...register("challenges")}
              placeholder="Tell us about your main business challenges..."
              className="min-h-[100px] bg-background/50 border-white/10"
              data-testid="input-demo-challenges"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Anything else we should know?</label>
            <Textarea
              {...register("consultationNotes")}
              placeholder="Additional context or requirements..."
              className="min-h-[80px] bg-background/50 border-white/10"
              data-testid="input-demo-notes"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choice")}
              className="flex-1 border-white/10"
              data-testid="button-demo-back"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || demoMutation.isPending}
              data-testid="button-demo-submit"
            >
              {isSubmitting || demoMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Demo"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
