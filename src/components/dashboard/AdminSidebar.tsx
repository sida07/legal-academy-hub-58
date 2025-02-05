import { Link, useLocation } from "react-router-dom";
import {
  Users,
  GraduationCap,
  ClipboardList,
  Settings,
  UserCog,
  LayoutGrid,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "إعدادات الحساب",
    icon: UserCog,
    href: "/dashboard/account",
  },
  {
    title: "إدارة المستخدمين",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "إدارة الدورات",
    icon: GraduationCap,
    href: "/dashboard/courses",
  },
  {
    title: "إدارة الاختبارات",
    icon: ClipboardList,
    href: "/dashboard/exams",
  },
  {
    title: "إدارة أقسام الموقع",
    icon: LayoutGrid,
    href: "/dashboard/sections",
  },
  {
    title: "إعدادات لوحة التحكم",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-white shadow-lg h-screen w-64 fixed right-0 top-0 text-right">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-gray-700 mb-4">
            لوحة التحكم
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        location.pathname === item.href
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}