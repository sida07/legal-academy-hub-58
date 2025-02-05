
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: 1, name: "القانون المدني", value: "civil" },
  { id: 2, name: "القانون الجزائي", value: "criminal" },
  { id: 3, name: "القانون الدستوري", value: "constitutional" },
  { id: 4, name: "القانون التجاري", value: "commercial" },
  { id: 5, name: "القانون الإداري", value: "administrative" },
];

const NewTopic = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Add topic creation logic here
    
    toast({
      title: "تم إنشاء الموضوع",
      description: "تم إنشاء موضوعك بنجاح",
    });
    
    navigate("/forum");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 text-gray-600">
          <Link to="/forum" className="hover:text-blue-600 transition-colors">المنتدى</Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-blue-600">موضوع جديد</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">إنشاء موضوع جديد</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                عنوان الموضوع
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل عنوان الموضوع"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                التصنيف
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                محتوى الموضوع
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب محتوى الموضوع هنا..."
                className="min-h-[200px]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/forum")}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="h-4 w-4 ml-2" />
                نشر الموضوع
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTopic;
