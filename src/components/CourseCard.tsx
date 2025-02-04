
interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  students: number;
}

const CourseCard = ({ title, description, image, students }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-right">{title}</h3>
        <p className="text-gray-600 mb-4 text-right">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">{students} طالب</span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
            سجل الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
