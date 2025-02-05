import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Upload, Trash2, Plus } from "lucide-react";

interface Material {
  id: number;
  title: string;
  type: string;
  size: string;
  uploadedAt: string;
  downloads: number;
}

const mockMaterials: Material[] = [
  {
    id: 1,
    title: "ملخص المحاضرة الأولى",
    type: "PDF",
    size: "2.5 MB",
    uploadedAt: "2024-01-15",
    downloads: 45,
  },
  {
    id: 2,
    title: "تمارين الوحدة الأولى",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "2024-01-20",
    downloads: 32,
  },
];

const CourseMaterials = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [search, setSearch] = useState("");

  const handleDelete = (materialId: number) => {
    setMaterials(materials.filter((m) => m.id !== materialId));
    toast({
      title: "تم حذف الملف",
      description: "تم حذف الملف بنجاح",
    });
  };

  const filteredMaterials = materials.filter((material) =>
    material.title.includes(search)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">الملفات والمواد التعليمية</h1>
        <Button>
          <Upload className="ml-2 h-4 w-4" />
          رفع ملف جديد
        </Button>
      </div>

      <Input
        placeholder="🔍 بحث في الملفات..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <FileText className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold">{material.title}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>النوع: {material.type}</p>
                    <p>الحجم: {material.size}</p>
                    <p>تاريخ الرفع: {material.uploadedAt}</p>
                    <p>عدد التحميلات: {material.downloads}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(material.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseMaterials;