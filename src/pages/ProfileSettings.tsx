import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Mail, Phone, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "أحمد محمد السيد",
    email: "ahmed@example.com",
    phone: "+20 123 456 789",
    university: "الجامعة العربية",
    specialization: "القانون المدني",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting profile updates:", formData);
    
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث معلومات الملف الشخصي",
    });

    navigate('/profile');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading image:", file);
      // Handle image upload logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-right">تعديل الملف الشخصي</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
            {/* Profile Image Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
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
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <User className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Mail className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Phone className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">الجامعة</Label>
                <Input
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">التخصص</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور الجديدة (اختياري)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10"
                    placeholder="اترك فارغاً إذا لم ترد التغيير"
                  />
                  <Lock className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                إلغاء
              </Button>
              <Button type="submit">حفظ التغييرات</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;