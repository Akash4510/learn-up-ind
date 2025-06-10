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
  Folder,
  FileText,
  ShieldCheck,
  CheckCircle,
  ImageIcon,
} from "lucide-react";

type Menu = {
  label: string;
  url: string;
  target?: string;
  icon: LucideIcon;
  isOpen?: boolean;
  isCollapsible?: boolean;
  items?: SubMenu[];
};

type SubMenu = {
  label: string;
  url: string;
  icon?: LucideIcon;
  target?: string;
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
        url: "/dashboard/explore",
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
        url: "/studio",
        icon: BarChart3,
      },
    ],
  },
  {
    groupLabel: "User Management",
    menus: [
      {
        label: "Roles & Permissions",
        url: "/studio/users/roles",
        icon: ShieldCheck,
      },
      {
        label: "KYC Approvals",
        url: "/studio/kyc",
        icon: CheckCircle,
      },
    ],
  },
  {
    groupLabel: "Media Management",
    menus: [
      {
        label: "Edit Media",
        url: "https://learnupind.sanity.studio/structure",
        icon: ImageIcon,
        target: "_blank",
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
    ],
  },
];
