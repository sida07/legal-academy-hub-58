import { User, Mail, Phone, MapPin, Camera, PencilLine, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-primary/10 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-4 left-4 bg-white/90 hover:bg-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4 flex justify-between items-end">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute bottom-0 right-0 bg-white hover:bg-gray-100 shadow-sm"
                >
                  <PencilLine className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  تغيير كلمة المرور
                </Button>
                <Button className="gap-2">
                  <PencilLine className="h-4 w-4" />
                  تعديل الملف الشخصي
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">أحمد محمد</h1>
                <p className="text-gray-500">محامي ومستشار قانوني</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">اسم المستخدم</p>
                      <p className="font-medium">ahmed.mohamed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-medium">ahmed.mohamed@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <p className="font-medium">+966 50 123 4567</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">العنوان</p>
                      <p className="font-medium">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">نوع العضوية</p>
                      <p className="font-medium">عضو مميز</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="font-semibold mb-3">نبذة شخصية</h2>
                <p className="text-gray-600 leading-relaxed">
                  محامي ومستشار قانوني متخصص في القانون التجاري والشركات. خبرة تمتد لأكثر من 10 سنوات في مجال الاستشارات القانونية وحل النزاعات التجارية.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;