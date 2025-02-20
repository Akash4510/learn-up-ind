import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-accent/50">
      <div className="w-[92%] max-w-[1300px] mx-auto flex flex-col gap-12">
        <div className="flex justify-between gap-10 flex-wrap flex-col lg:flex-row">
          <div className="flex-1">
            <h3 className="text-lg mb-2">© LearnUPIND 2024</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate platform where creators thrive and learners excel.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="mb-3 underline underline-offset-4">
              Legal Information
            </h3>
            <ul className="flex flex-col gap-1 text-muted-foreground">
              <Link
                href="/terms-and-conditions"
                className="hover:underline transition-all w-fit"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:underline transition-all w-fit"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:underline transition-all w-fit"
              >
                Warning Disclaimer
              </Link>
              <Link
                href="/refund-policy"
                className="hover:underline transition-all w-fit"
              >
                Refund Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:underline transition-all w-fit"
              >
                Shipping Policy
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-3 underline underline-offset-4">
              Resources and Links
            </h3>
            <ul className="flex flex-col gap-1 text-muted-foreground">
              <Link
                href="/courses"
                className="hover:underline transition-all w-fit"
              >
                Courses
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Pricing
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-3 underline underline-offset-4">Contact</h3>
            <ul className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <Link
                  href="mailto:helplearnupind@gmail.com"
                  className="text-muted-foreground hover:underline"
                >
                  helplearnupind@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <p className="text-muted-foreground">
                  Kamrup, Guwahati, Assam - 781003
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <p className="text-muted-foreground">+91 9387736619</p>
              </div>
            </ul>

            <div className="mt-5 flex gap-4">{/* Socials */}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
