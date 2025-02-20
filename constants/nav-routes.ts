import {
  BarChart3,
  Compass,
  Home,
  IndianRupee,
  Info,
  LucideIcon,
  Mail,
  Tv,
  User,
  UsersRound,
  Wrench,
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

export const adminDashboarRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/admin-dashboard",
    icon: BarChart3,
  },
  {
    label: "Creator access requests",
    href: "/admin-dashboard/creator-access-requests",
    icon: Wrench,
  },
];
