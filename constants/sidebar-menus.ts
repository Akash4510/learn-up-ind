import {
  BarChart3,
  Image,
  LucideIcon,
  User,
  Users,
  Trophy,
  Zap,
  MessageCircle,
  Settings,
  BookOpen,
  Bookmark,
  IndianRupee,
  Sparkles,
  Dumbbell,
} from "lucide-react";

type Menu = {
  label: string;
  url: string;
  icon: LucideIcon;
  isOpen?: boolean;
  isCollapsible?: boolean;
  items?: SubMenu[];
};

type SubMenu = {
  label: string;
  url: string;
  icon?: LucideIcon;
};

export type MenuGroup = {
  groupLabel: string;
  menus: Menu[];
};

export const dashboardMenus: MenuGroup[] = [
  {
    groupLabel: "General",
    menus: [
      {
        label: "Analytics",
        url: "/dashboard",
        icon: BarChart3,
      },
      {
        label: "My Courses",
        url: "/dashboard/my-courses",
        icon: Bookmark,
      },
      {
        label: "Training",
        url: "#",
        icon: Dumbbell,
        isCollapsible: true,
        isOpen: false,
        items: [
          {
            label: "Beginner Training",
            url: "/dashboard/training/beginner",
          },
          {
            label: "Intermediate Training",
            url: "/dashboard/training/intermediate",
          },
          {
            label: "Advanced Training",
            url: "/dashboard/training/advanced",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "Earnings",
    menus: [
      {
        label: "Affiliate",
        url: "/dashboard/affiliate",
        icon: Users,
      },
      {
        label: "Payout",
        url: "/dashboard/payout",
        icon: IndianRupee,
      },
    ],
  },
  {
    groupLabel: "Our Community",
    menus: [
      {
        label: "Leaderboard",
        url: "/dashboard/leaderboard",
        icon: Trophy,
      },
      {
        label: "Live Offers",
        url: "/dashboard/live-offers",
        icon: Zap,
      },
      {
        label: "Community",
        url: "/dashboard/community",
        icon: MessageCircle,
      },
    ],
  },
  {
    groupLabel: "Account",
    menus: [
      {
        label: "Profile",
        url: "/dashboard/account",
        icon: User,
      },
      {
        label: "KYC Details",
        url: "/dashboard/account/kyc",
        icon: Settings,
      },
      {
        label: "Upgrade",
        url: "/dashboard/upgrade",
        icon: Sparkles,
      },
    ],
  },
];

export const studioMenus: MenuGroup[] = [
  {
    groupLabel: "Studio",
    menus: [
      {
        label: "Analytics",
        url: "/studio",
        icon: BarChart3,
      },
      {
        label: "Manage Media",
        url: "/studio/media",
        icon: Image,
      },
      {
        label: "Manage Courses",
        url: "/studio/courses",
        icon: BookOpen,
      },
      {
        label: "Manage User Roles",
        url: "/studio/user-roles",
        icon: Users,
      },
    ],
  },
];
