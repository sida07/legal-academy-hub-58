import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/c1edf3a5-859b-4b65-83a8-1762858b1b02.png" 
                alt="Juriste" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-secondary">JURISTE</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">الرئيسية</Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary transition-colors font-medium">الدورات</Link>
            <Link to="/exams" className="text-gray-600 hover:text-primary transition-colors font-medium">الاختبارات</Link>
            <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">المدونة</Link>
            <Link to="/forum" className="text-gray-600 hover:text-primary transition-colors font-medium">المنتدى</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              الرئيسية
            </Link>
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              الدورات
            </Link>
            <Link 
              to="/exams" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              الاختبارات
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              المدونة
            </Link>
            <Link 
              to="/forum" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              المنتدى
            </Link>
          </div>
          <div className="px-4 py-3 border-t flex justify-end space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;