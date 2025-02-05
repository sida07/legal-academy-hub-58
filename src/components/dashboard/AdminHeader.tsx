import { 
  Settings, 
  Users, 
  BookOpen, 
  ClipboardList,
  UserCheck,
  Bell, 
  Search
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Admin Controls */}
          <Button variant="ghost" size="icon" className="relative group">
            <UserCheck className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              حساب المشرف
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative group">
            <Users className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              إدارة المستخدمين
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative group">
            <BookOpen className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              إدارة الدورات التكوينية
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative group">
            <ClipboardList className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              إدارة الاختبارات
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative group">
            <Settings className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              إعدادات لوحة التحكم
            </span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="بحث..."
              className="pl-4 pr-10 w-64"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;