import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  students: number;
  level: string;
  duration: string;
  instructor: string;
  rating: number;
}

const CourseCard = ({
  title,
  description,
  image,
  students,
  level,
  duration,
  instructor,
  rating,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-right">{title}</h3>
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500" />
            {rating}
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-right">{description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>👨‍🏫 {instructor}</span>
          <span>⏱️ {duration}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary text-sm">🎓 {students} طالب</span>
          <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
            {level}
          </span>
        </div>

        <Button className="w-full bg-primary hover:bg-primary-dark transition">
          سجل الآن
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;