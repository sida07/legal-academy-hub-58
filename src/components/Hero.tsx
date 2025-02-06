import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white pt-16 flex items-center">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-right space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
            منصة حقوقي <span className="text-primary">JURISTE</span> تقدم
            <br />
            دورات قانونية أونلاين
          </h1>
          <div className="space-y-4 text-lg text-gray-600">
            <p>تتميز بوجود نخبة من المحاضرين المتميزين</p>
            <p>تُقدم برامج متخصصة في مجالات القانون المختلفة</p>
            <p>توفر شهادات معتمدة بعد إتمام كل دورة</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link to="/courses">
              <Button
                className="w-full sm:w-auto bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors px-8 py-6 text-lg"
              >
                عرض الدورات
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg"
              >
                قم بإنشاء حسابك المجاني
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img 
            src="/lovable-uploads/c1edf3a5-859b-4b65-83a8-1762858b1b02.png"
            alt="Juriste Logo"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;