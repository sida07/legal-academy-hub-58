
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Mail, Phone, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  specialization: string;
  password?: string;
}

const ProfileSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "أحمد محمد السيد",
      email: "ahmed@example.com",
      phone: "+20 123 456 789",
      university: "الجامعة العربية",
      specialization: "القانون المدني",
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log("Submitting profile updates:", data);
      
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث معلومات الملف الشخصي",
      });

      navigate('/profile');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الملف الشخصي",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading image:", file);
      toast({
        title: "تم رفع الصورة",
        description: "تم تحديث صورة الملف الشخصي",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] to-[#E5DEFF]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 border border-[#D6BCFA]">
          <h2 className="text-2xl font-bold mb-6 text-right text-[#6E59A5]">تعديل الملف الشخصي</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
            {/* Profile Image Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8B5CF6] shadow-lg">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
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
                <Label htmlFor="fullName" className="text-[#6E59A5]">الاسم الكامل</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    {...register("fullName", { required: "الاسم الكامل مطلوب" })}
                    className="pr-10 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <User className="absolute top-3 right-3 h-5 w-5 text-[#7E69AB]" />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#6E59A5]">البريد الإلكتروني</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "البريد الإلكتروني مطلوب",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "البريد الإلكتروني غير صالح"
                      }
                    })}
                    className="pr-10 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <Mail className="absolute top-3 right-3 h-5 w-5 text-[#7E69AB]" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#6E59A5]">رقم الهاتف</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    {...register("phone", { required: "رقم الهاتف مطلوب" })}
                    className="pr-10 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <Phone className="absolute top-3 right-3 h-5 w-5 text-[#7E69AB]" />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="university" className="text-[#6E59A5]">الجامعة</Label>
                <Input
                  id="university"
                  {...register("university", { required: "الجامعة مطلوبة" })}
                  className="border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                />
                {errors.university && (
                  <p className="text-sm text-red-500">{errors.university.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-[#6E59A5]">التخصص</Label>
                <Input
                  id="specialization"
                  {...register("specialization", { required: "التخصص مطلوب" })}
                  className="border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                />
                {errors.specialization && (
                  <p className="text-sm text-red-500">{errors.specialization.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#6E59A5]">كلمة المرور الجديدة (اختياري)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="pr-10 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
                    placeholder="اترك فارغاً إذا لم ترد التغيير"
                  />
                  <Lock className="absolute top-3 right-3 h-5 w-5 text-[#7E69AB]" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile')}
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
              >
                إلغاء
              </Button>
              <Button 
                type="submit"
                className="bg-[#8B5CF6] hover:bg-[#7E69AB] text-white"
              >
                حفظ التغييرات
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

