import { Card } from "@/components/ui/card";
import { Brain, Clock, Shuffle, Target } from "lucide-react";

const features = [
  {
    title: "AI-Powered Personalization",
    description:
      "Our AI understands your brand voice and creates content that resonates with your audience.",
    icon: Brain,
  },
  {
    title: "Save Time",
    description:
      "Generate weeks worth of content in minutes, not hours. Focus on what matters most.",
    icon: Clock,
  },
  {
    title: "Boost Engagement",
    description:
      "Create content that drives engagement with AI-optimized posts for each platform.",
    icon: Target,
  },
  {
    title: "Content Variation",
    description:
      "Generate multiple versions of the same content to find the perfect fit.",
    icon: Shuffle,
  },
];

export function FeaturesSection() {
  return (
    <section
      className="pt-16 pb-24 lg:pb-32 lg:pt-28 px-8 md:px-16"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Features that empower your content
          </h2>
          <p className="mt-2 text-lg text-muted-foreground font-medium">
            Everything you need to create engaging content that converts
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
