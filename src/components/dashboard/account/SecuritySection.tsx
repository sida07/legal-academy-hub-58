import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lock, Check, X, Shield, QrCode, Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SecuritySectionProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  securitySettings: {
    twoFactor: boolean;
    loginNotifications: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecuritySettingChange: (setting: string, value: boolean) => void;
  onPasswordUpdate: (e: React.FormEvent) => void;
}

const SecuritySection = ({
  formData,
  securitySettings,
  onInputChange,
  onSecuritySettingChange,
  onPasswordUpdate,
}: SecuritySectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#8B5CF6] flex items-center gap-2">
          <Lock className="h-6 w-6" />
          تغيير كلمة المرور
        </h2>

        <form onSubmit={onPasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={onInputChange}
              className="text-right transition-all duration-300 hover:border-[#9b87f5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={onInputChange}
              className="text-right transition-all duration-300 hover:border-[#9b87f5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={onInputChange}
              className="text-right transition-all duration-300 hover:border-[#9b87f5]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="gap-2 hover:bg-gray-100 transition-all duration-300"
            >
              <X className="h-4 w-4" />
              إلغاء
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-[#9b87f5] hover:bg-[#8B5CF6] transition-all duration-300"
            >
              <Check className="h-4 w-4" />
              تحديث كلمة المرور
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#8B5CF6] flex items-center gap-2">
          <Shield className="h-6 w-6" />
          إعدادات الأمان
        </h2>

        <div className="space-y-6">
          <TooltipProvider>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-[#8B5CF6]" />
                <div className="space-y-1">
                  <Label>التحقق بخطوتين (2FA)</Label>
                  <p className="text-sm text-gray-500">
                    تأمين إضافي لحسابك عند تسجيل الدخول
                  </p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={securitySettings.twoFactor}
                    onCheckedChange={(checked) =>
                      onSecuritySettingChange("twoFactor", checked)
                    }
                    className="data-[state=checked]:bg-[#8B5CF6]"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>تفعيل المصادقة الثنائية لحماية حسابك</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#8B5CF6]" />
                <div className="space-y-1">
                  <Label>إشعارات تسجيل الدخول</Label>
                  <p className="text-sm text-gray-500">
                    تلقي إشعار عند تسجيل الدخول من جهاز جديد
                  </p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) =>
                      onSecuritySettingChange("loginNotifications", checked)
                    }
                    className="data-[state=checked]:bg-[#8B5CF6]"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>تلقي تنبيهات عند تسجيل الدخول من أجهزة جديدة</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;