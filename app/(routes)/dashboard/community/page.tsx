import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";

import { TitleBlock } from "@/components/title-block";
import { sanityClient } from "@/lib/sanity/client";
import { CommunityLinks } from "@/lib/sanity/types";
import { getCommunityLinksQuery } from "@/lib/sanity/queries";

async function getCommunityLinks(): Promise<CommunityLinks> {
  return (
    (await sanityClient.fetch<CommunityLinks>(getCommunityLinksQuery)) || {}
  );
}

const CommunityPage = async () => {
  const communityLinks = await getCommunityLinks();
  console.log({ communityLinks });

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: communityLinks.facebook,
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: communityLinks.twitter,
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: communityLinks.instagram,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: communityLinks.linkedin,
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: communityLinks.youtube,
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      url: communityLinks.telegram,
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
            href={social.url || ""}
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
