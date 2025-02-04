
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">منصة القانون</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#" className="text-gray-700 hover:text-primary transition">الرئيسية</a>
            <a href="#" className="text-gray-700 hover:text-primary transition">الدورات</a>
            <a href="#" className="text-gray-700 hover:text-primary transition">الاختبارات</a>
            <a href="#" className="text-gray-700 hover:text-primary transition">المنتدى</a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary transition">الرئيسية</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary transition">الدورات</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary transition">الاختبارات</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary transition">المنتدى</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
