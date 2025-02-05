import { Link } from "react-router-dom";
import { Search, UserRound, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QCMHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const QCMHeader = ({ isMenuOpen, setIsMenuOpen }: QCMHeaderProps) => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="text-xl font-bold text-primary mr-4">منصة القانون</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">الرئيسية</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">لوحة التحكم</Link>
            <Link to="/forum" className="text-gray-700 hover:text-primary transition-colors">المنتدى</Link>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <UserRound className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              الرئيسية
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              لوحة التحكم
            </Link>
            <Link 
              to="/forum" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              المنتدى
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default QCMHeader;