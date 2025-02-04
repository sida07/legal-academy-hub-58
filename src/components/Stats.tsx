
const Stats = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">+95%</div>
            <div className="text-gray-600">نسبة النجاح</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">+200</div>
            <div className="text-gray-600">دورة تدريبية</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">+50</div>
            <div className="text-gray-600">أستاذ متخصص</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">+1000</div>
            <div className="text-gray-600">طالب مسجل</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
