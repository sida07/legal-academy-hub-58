import { Button } from "@/components/ui/button";
import { Camera, Mail, Phone, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const profileData = {
    fullName: "أحمد محمد السيد",
    email: "ahmed@example.com",
    phone: "+20 123 456 789",
    university: "الجامعة العربية",
    specialization: "القانون المدني",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => navigate('/profile-settings')}
              className="ml-auto"
            >
              تعديل الملف الشخصي
            </Button>
            <h2 className="text-2xl font-bold">الملف الشخصي</h2>
          </div>
          
          <div className="space-y-6" dir="rtl">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{profileData.fullName}</span>
                </div>
                <User className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{profileData.email}</span>
                </div>
                <Mail className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{profileData.phone}</span>
                </div>
                <Phone className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{profileData.university}</span>
                </div>
                <span className="text-sm text-gray-500">الجامعة</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{profileData.specialization}</span>
                </div>
                <span className="text-sm text-gray-500">التخصص</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/profile-settings')}
              >
                تعديل الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;