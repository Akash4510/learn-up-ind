import {
  BarChart3,
  Compass,
  Home,
  ImagePlus,
  IndianRupee,
  Info,
  LucideIcon,
  Mail,
  Tv,
  User,
  UsersRound,
} from "lucide-react";

type NavRoute = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainRoutes: NavRoute[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: Compass,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
];

export const dashboardRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "My Courses",
    href: "/dashboard/my-courses",
    icon: Tv,
  },
  {
    label: "Affiliate",
    href: "/dashboard/affiliate",
    icon: IndianRupee,
  },
  {
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: UsersRound,
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: User,
  },
];

export const studioRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/studio",
    icon: BarChart3,
  },
  {
    label: "Manage Media",
    href: "/studio/media",
    icon: ImagePlus,
  },
  {
    label: "Manage Courses",
    href: "/studio/courses",
    icon: Tv,
  },
  {
    label: "Manage User Roles",
    href: "/studio/user-roles",
    icon: UsersRound,
  },
];
