import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ الإعدادات بنجاح",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">إعدادات المنصة</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>اسم المنصة</Label>
          <Input defaultValue="منصة القانون" />
        </div>

        <div className="space-y-2">
          <Label>البريد الإلكتروني للدعم</Label>
          <Input type="email" defaultValue="support@example.com" />
        </div>

        <div className="flex items-center justify-between">
          <Label>تفعيل التسجيل</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label>تفعيل المنتدى</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label>تفعيل الإشعارات</Label>
          <Switch defaultChecked />
        </div>

        <Button onClick={handleSave} className="w-full">
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
};

export default Settings;