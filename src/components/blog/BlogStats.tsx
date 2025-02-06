import { Card } from "@/components/ui/card";
import { ChartBar, Tag } from "lucide-react";

export const BlogStats = ({ totalPosts }: { totalPosts: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="p-3 bg-primary/10 rounded-lg">
            <ChartBar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">إجمالي المقالات</p>
            <p className="text-2xl font-semibold">{totalPosts}</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Tag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">التصنيفات</p>
            <p className="text-2xl font-semibold">8</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="p-3 bg-primary/10 rounded-lg">
            <ChartBar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
            <p className="text-2xl font-semibold">2.1K</p>
          </div>
        </div>
      </Card>
    </div>
  );
};