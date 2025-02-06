import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSectionProps {
  profileImage: string;
  formData: {
    fullName: string;
    email: string;
  };
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onReset: () => void;
}

const ProfileSection = ({
  profileImage,
  formData,
  onImageUpload,
  onInputChange,
  onSave,
  onReset,
}: ProfileSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#8B5CF6] flex items-center gap-2">
          المعلومات الشخصية
        </h2>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative group">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-2 ring-[#9b87f5] ring-offset-2 transition-all duration-300 hover:ring-4"
          />
          <label
            htmlFor="profile-image"
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
          >
            <Camera className="h-8 w-8 text-white" />
          </label>
          <input
            type="file"
            id="profile-image"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[#403E43]">
            الاسم الكامل
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            className="text-right hover:border-[#9b87f5] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#403E43]">
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="bg-gray-50 text-right"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2 hover:bg-gray-100 transition-all duration-300"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة تعيين
        </Button>
        <Button
          onClick={onSave}
          className="gap-2 bg-[#9b87f5] hover:bg-[#8B5CF6] transition-all duration-300"
        >
          <Save className="h-4 w-4" />
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;