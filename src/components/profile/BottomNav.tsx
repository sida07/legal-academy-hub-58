import { Link } from "react-router-dom";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-[#E5DEFF] shadow-lg py-3 px-6 z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center">
          <Link 
            to="/" 
            className="flex flex-col items-center text-[#6E59A5] hover:text-[#8B5CF6] transition-colors"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          
          <Link 
            to="/qcm" 
            className="flex flex-col items-center text-[#6E59A5] hover:text-[#8B5CF6] transition-colors"
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">الاختبارات</span>
          </Link>
          
          <Link 
            to="/forum" 
            className="flex flex-col items-center text-[#6E59A5] hover:text-[#8B5CF6] transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">المنتدى</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex flex-col items-center text-[#8B5CF6]"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">حسابي</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;