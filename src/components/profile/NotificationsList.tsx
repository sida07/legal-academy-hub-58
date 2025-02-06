import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  type: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

export const NotificationsList = ({ notifications }: NotificationsListProps) => {
  return (
    <div className="space-y-4">
      {notifications.map((notif) => (
        <div key={notif.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <Badge className="bg-[#8B5CF6]">{notif.type === 'reminder' ? 'تذكير' : 'تحديث'}</Badge>
            <p className="text-sm text-[#7E69AB]">
              {new Date(notif.date).toLocaleDateString('ar-MA')}
            </p>
          </div>
          <h3 className="text-lg font-semibold mt-4 text-right text-[#6E59A5]">{notif.title}</h3>
          <p className="text-sm text-[#7E69AB] mt-2 text-right">{notif.message}</p>
        </div>
      ))}
    </div>
  );
};