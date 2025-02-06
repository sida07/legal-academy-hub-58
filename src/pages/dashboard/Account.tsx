import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ProfileSection from "@/components/dashboard/account/ProfileSection";
import SecuritySection from "@/components/dashboard/account/SecuritySection";

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

  const handleSecuritySettingChange = (setting: string, value: boolean) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
    toast({
      title: "تم التحديث",
      description: `تم ${value ? "تفعيل" : "تعطيل"} ${
        setting === "twoFactor" ? "التحقق بخطوتين" : "إشعارات تسجيل الدخول"
      }`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8 text-right text-[#8B5CF6] animate-fade-in">
        إعدادات الحساب
      </h1>

      <div className="grid gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <ProfileSection
            profileImage={profileImage}
            formData={formData}
            onImageUpload={handleImageUpload}
            onInputChange={handleInputChange}
            onSave={handleSaveProfile}
            onReset={handleResetProfile}
          />
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <SecuritySection
            formData={formData}
            securitySettings={securitySettings}
            onInputChange={handleInputChange}
            onSecuritySettingChange={handleSecuritySettingChange}
            onPasswordUpdate={handlePasswordUpdate}
          />
        </Card>
      </div>
    </div>
  );
};

export default Account;