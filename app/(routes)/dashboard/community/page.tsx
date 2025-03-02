import { TitleBlock } from "@/components/title-block";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";
import Link from "next/link";

const CommunityPage = () => {
  // Social links data
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "/",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "/",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "/",
    },
  ];

  return (
    <div className="space-y-8">
      <TitleBlock
        title="Our Community"
        subtitle="Connect with our wonderful community"
      />

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.url}
            className="group p-6 border rounded-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center space-y-3 text-center"
          >
            <div className="text-primary group-hover:text-primary-dark transition-all duration-300">
              <social.icon className="size-8" />
            </div>
            <p className="text-lg font-medium text-muted-foreground group-hover:text-primary transition-all duration-300">
              {social.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
