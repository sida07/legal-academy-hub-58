import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  User,
  Mail,
  Lock,
  Save,
  RotateCcw,
  Shield,
  QrCode,
  Bell,
  Check,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Account = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
  const [formData, setFormData] = useState({
    fullName: "أحمد محمد",
    email: "ahmed@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    loginNotifications: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "تم الحفظ",
      description: "تم تحديث المعلومات الشخصية بنجاح",
    });
  };

  const handleResetProfile = () => {
    setFormData({
      ...formData,
      fullName: "أحمد محمد",
    });
    toast({
      title: "تم إعادة التعيين",
      description: "تم إعادة تعيين المعلومات إلى القيم الأصلية",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "تم التحديث",
      description: "تم تحديث كلمة المرور بنجاح",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 text-right text-primary">إعدادات الحساب</h1>

        {/* Personal Information */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#8B5CF6]">
                <User className="h-6 w-6" />
                المعلومات الشخصية
              </h2>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative group animate-fade-in">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover ring-2 ring-[#9b87f5] ring-offset-2"
                />
                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                >
                  <Camera className="h-8 w-8 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#403E43]">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="text-right hover:border-[#9b87f5] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#403E43]">البريد الإلكتروني</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="bg-gray-50 text-right pr-10"
                  />
                  <Mail className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleResetProfile}
                className="gap-2 hover:bg-gray-100"
              >
                <RotateCcw className="h-4 w-4" />
                إعادة تعيين
              </Button>
              <Button onClick={handleSaveProfile} className="gap-2 bg-[#9b87f5] hover:bg-[#8B5CF6]">
                <Save className="h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </Card>

        {/* Password Change */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#8B5CF6]">
              <Lock className="h-6 w-6" />
              تغيير كلمة المرور
            </h2>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="text-right"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  إلغاء
                </Button>
                <Button type="submit" className="gap-2 bg-[#9b87f5] hover:bg-[#8B5CF6]">
                  <Check className="h-4 w-4" />
                  تحديث كلمة المرور
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#8B5CF6]">
              <Shield className="h-6 w-6" />
              إعدادات الأمان
            </h2>

            <div className="space-y-6">
              <TooltipProvider>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
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
                          setSecuritySettings((prev) => ({
                            ...prev,
                            twoFactor: checked,
                          }))
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تفعيل المصادقة الثنائية لحماية حسابك</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
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
                          setSecuritySettings((prev) => ({
                            ...prev,
                            loginNotifications: checked,
                          }))
                        }
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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Account;