
const Hero = () => {
  return (
    <div className="bg-primary text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          منصتك الشاملة للتحضير للمناظرات القانونية
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
          نوفر لك أفضل الدورات والموارد التعليمية لمساعدتك في تحقيق أهدافك
        </p>
        <div className="flex justify-center gap-4 animate-slide-up">
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            ابدأ الآن
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
            اكتشف المزيد
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
