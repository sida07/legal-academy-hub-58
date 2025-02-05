import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, MessageSquare, Users, Star, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Stats data
  const stats = [
    { title: "إجمالي المستخدمين", value: "1,234", icon: Users },
    { title: "الدورات النشطة", value: "45", icon: BookOpen },
    { title: "الاختبارات المكتملة", value: "892", icon: Trophy },
    { title: "المناقشات النشطة", value: "156", icon: MessageSquare },
  ];

  // Featured courses data
  const featuredCourses = [
    {
      title: "القانون المدني",
      description: "دورة شاملة في القانون المدني والإجراءات",
      students: 584,
      rating: 4.8,
    },
    {
      title: "القانون الجنائي",
      description: "تحضير متكامل للقانون الجنائي وإجراءاته",
      students: 423,
      rating: 4.9,
    },
  ];

  // Recent forum discussions
  const recentDiscussions = [
    {
      title: "تفسير المادة 158 من القانون المدني",
      author: "أحمد محمد",
      replies: 12,
      date: "منذ ساعتين",
    },
    {
      title: "إجراءات التقاضي في المحاكم الإدارية",
      author: "سارة أحمد",
      replies: 8,
      date: "منذ 3 ساعات",
    },
  ];

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">مرحباً بك في لوحة التحكم</h1>
        <p className="text-xl opacity-90 mb-6">اكتشف آخر التحديثات والإحصائيات الخاصة بمنصتك التعليمية</p>
        <Button variant="secondary" className="hover:bg-white hover:text-primary">
          استعرض التقارير
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              الدورات المميزة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.students} طالب
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Discussions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            آخر المناقشات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDiscussions.map((discussion, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-semibold">{discussion.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    بواسطة {discussion.author} • {discussion.date}
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-primary">{discussion.replies} رد</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            تحليلات الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            رسم بياني للأداء سيتم إضافته هنا
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;