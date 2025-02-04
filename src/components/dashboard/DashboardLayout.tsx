
import { ArrowLeft, Bell, Search, Settings, User } from "lucide-react";
import StatCard from "./StatCard";
import NotificationList from "./NotificationList";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
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
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي المستخدمين"
            value="1,234"
            trend="+12%"
            trendDirection="up"
            icon="users"
          />
          <StatCard
            title="الدورات النشطة"
            value="45"
            trend="+5%"
            trendDirection="up"
            icon="graduationCap"
          />
          <StatCard
            title="الاختبارات المجراة"
            value="867"
            trend="+8%"
            trendDirection="up"
            icon="fileCheck"
          />
          <StatCard
            title="المناقشات الجديدة"
            value="92"
            trend="+3%"
            trendDirection="up"
            icon="messageSquare"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">توزيع المستخدمين</h3>
            {/* Add Chart Component Here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">آخر نشاط</h3>
            {/* Add Activity Chart Component Here */}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">آخر التنبيهات</h3>
          <NotificationList />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
