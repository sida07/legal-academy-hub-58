
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    bio: string;
  };
}

export const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileSettings = () => {
    try {
      navigate('/profile/settings'); // Changed from '/profile-settings' to '/profile/settings'
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء الانتقال إلى إعدادات الملف الشخصي",
      });
    }
  };

  return (
    <div className="mb-8">
      <Card className="p-6 bg-white/80 backdrop-blur border-[#D6BCFA]">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="w-24 h-24 border-4 border-[#8B5CF6]">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>
              <User className="w-12 h-12 text-[#6E59A5]" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1A1F2C]">{userProfile.name}</h1>
                <p className="text-[#7E69AB]">{userProfile.bio}</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
                  onClick={handleProfileSettings}
                >
                  إكمال الملف الشخصي
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#6E59A5]">
                <Mail className="w-4 h-4" />
                {userProfile.email}
              </div>
              <div className="flex items-center gap-2 text-[#6E59A5]">
                <Phone className="w-4 h-4" />
                {userProfile.phone}
              </div>
              <div className="flex items-center gap-2 text-[#6E59A5]">
                <MapPin className="w-4 h-4" />
                {userProfile.location}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
