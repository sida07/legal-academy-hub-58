import { Bell, MessageSquare, AlertTriangle } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "تم تسجيل مستخدم جديد",
    description: "قام مستخدم جديد بتسجيل حساب",
    time: "قبل دقيقتين",
    icon: Bell,
  },
  {
    id: 2,
    title: "رسالة مساعدة جديدة",
    description: "هناك استفسار جديد في المنتدى يحتاج إلى مراجعة",
    time: "قبل 15 دقيقة",
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "تحذير النظام",
    description: "تم الإبلاغ عن محتوى غير لائق",
    time: "قبل 30 دقيقة",
    icon: AlertTriangle,
  },
];

const NotificationList = () => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg animate-fade-in"
        >
          <div className="bg-primary/10 p-2 rounded">
            <notification.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.description}</p>
            <span className="text-xs text-gray-400">{notification.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;