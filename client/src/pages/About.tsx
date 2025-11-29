import { Layout } from "@/components/layout/Layout";
import { team } from "@/lib/data";
import ceoImg from "@assets/DSC08793-1_1764429809287.JPG";
import dsImg from "@assets/generated_images/data_scientist_headshot.png";
import officeImg from "@assets/generated_images/modern_office_interior.png";

export default function About() {
  const getImage = (key: string) => {
    if (key.includes("CEO")) return ceoImg;
    if (key.includes("Data Scientist")) return dsImg;
    return officeImg;
  };

  return (
    <Layout>
      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">
                Driving Innovation with <span className="text-primary">Purpose</span>
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded by UT Business School–trained technologist Amani Latson, Manna Solutions LLC merges deep technical skill with business fluency.
                </p>
                <p>
                  We don't just build models; we craft machine learning systems that are explainable, ethical, and ROI-driven. Our mission is to democratize access to advanced AI technologies for businesses ready to scale.
                </p>
                <p>
                  Headquartered in Texas with a distributed team of experts, we serve clients seeking to automate and optimize complex decision-making processes.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl rounded-3xl"></div>
              <img 
                src={officeImg} 
                alt="Office" 
                className="relative rounded-3xl shadow-2xl border border-white/10 aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Meet the Minds</h2>
            <p className="text-muted-foreground">The experts behind our intelligent solutions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className={`bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors group ${i === 0 ? "text-right" : "text-center"}`}>
                <div className={`mb-6 relative inline-block ${i === 0 ? "float-right" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={getImage(member.image)} 
                    alt={member.name} 
                    className="h-32 w-32 rounded-full object-cover object-center border-2 border-white/10 relative z-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}