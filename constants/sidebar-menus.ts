import {
  BarChart3,
  LucideIcon,
  User,
  Users,
  Trophy,
  Zap,
  MessageCircle,
  BookOpen,
  Bookmark,
  IndianRupee,
  Sparkles,
  Dumbbell,
  IdCard,
  CreditCard,
  Settings,
  Star,
  Folder,
  FileText,
  Video,
  LayoutDashboard,
  ClipboardCheck,
  ShieldCheck,
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
        icon: IdCard,
      },
      {
        label: "Upgrade",
        url: "/dashboard/account",
        icon: Sparkles,
      },
    ],
  },
];

export const studioMenus: MenuGroup[] = [
  {
    groupLabel: "Analytics",
    menus: [
      {
        label: "Overview",
        url: "/studio/analytics",
        icon: BarChart3,
      },
      {
        label: "User Insights",
        url: "/studio/analytics/user-insights",
        icon: Users,
      },
      {
        label: "Course Performance",
        url: "/studio/analytics/course-performance",
        icon: BookOpen,
      },
    ],
  },
  {
    groupLabel: "User Management",
    menus: [
      {
        label: "All Users",
        url: "/studio/users",
        icon: Users,
      },
      {
        label: "Roles & Permissions",
        url: "/studio/users/roles",
        icon: ShieldCheck,
      },
      {
        label: "Activity Logs",
        url: "/studio/users/activity-logs",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    groupLabel: "Media Management",
    menus: [
      {
        label: "Home Page Media",
        url: "/studio/media/home",
        icon: LayoutDashboard,
      },
      {
        label: "Live Offers Media",
        url: "/studio/media/live-offers",
        icon: Zap,
      },
      {
        label: "Course Media",
        url: "/studio/media/courses",
        icon: Video,
      },
      {
        label: "File Library",
        url: "/studio/media/library",
        icon: Folder,
      },
    ],
  },
  {
    groupLabel: "Course Management",
    menus: [
      {
        label: "Courses",
        url: "/studio/courses",
        icon: BookOpen,
      },
      {
        label: "Create Course",
        url: "/studio/courses/new",
        icon: FileText,
      },
      {
        label: "Categories",
        url: "/studio/courses/categories",
        icon: Folder,
      },
      {
        label: "Reviews & Ratings",
        url: "/studio/courses/reviews",
        icon: Star,
      },
    ],
  },
  {
    groupLabel: "Payout Management",
    menus: [
      {
        label: "Payout Requests",
        url: "/studio/payouts",
        icon: CreditCard,
      },
      {
        label: "Transaction History",
        url: "/studio/payouts/history",
        icon: IndianRupee,
      },
      {
        label: "Payout Settings",
        url: "/studio/payouts/settings",
        icon: Settings,
      },
    ],
  },
];
