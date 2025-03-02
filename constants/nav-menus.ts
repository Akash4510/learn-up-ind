import { Home, Info, LucideIcon, Mail, BookOpen } from "lucide-react";

type Menu = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainMenus: Menu[] = [
  {
    label: "Home",
    href: "/",
    icon: Home, // Home icon is perfect for the homepage
  },
  {
    label: "Courses",
    href: "/courses",
    icon: BookOpen, // BookOpen represents courses/learning
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail, // Mail icon is perfect for contact
  },
  {
    label: "About",
    href: "/about",
    icon: Info, // Info icon is suitable for About
  },
];
