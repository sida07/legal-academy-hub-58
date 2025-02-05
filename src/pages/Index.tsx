import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <main className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مرحباً بك في منصة القانون
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            منصتك التعليمية المتكاملة للدراسات القانونية
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/courses">استكشف الدورات</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/forum">انضم للمنتدى</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">دورات متخصصة</h2>
            <p className="text-gray-600">
              اكتشف مجموعة متنوعة من الدورات القانونية المتخصصة
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">اختبارات تفاعلية</h2>
            <p className="text-gray-600">
              قم بتقييم معرفتك من خلال اختباراتنا التفاعلية
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">مجتمع نشط</h2>
            <p className="text-gray-600">
              تواصل مع زملائك وشارك في النقاشات القانونية
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;