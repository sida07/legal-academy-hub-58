import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  ClipboardList,
  Settings,
  UserCog,
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
    title: "إعدادات لوحة التحكم",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
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