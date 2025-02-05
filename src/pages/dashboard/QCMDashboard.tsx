import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Plus,
  Search,
  Users,
  BarChart,
  Pencil,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Test {
  id: string;
  title: string;
  category: "lawyer" | "other";
  year: string;
  questionsCount: number;
  participants: number;
  successRate: number;
}

const QCMDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"lawyer" | "other">("lawyer");

  // Mock data - will be replaced with actual data from backend
  const mockTests: Test[] = [
    {
      id: "1",
      title: "اختبار سنة 2024",
      category: "lawyer",
      year: "2024",
      questionsCount: 50,
      participants: 120,
      successRate: 75,
    },
    {
      id: "2",
      title: "اختبار سنة 2023",
      category: "lawyer",
      year: "2023", 
      questionsCount: 50,
      participants: 200,
      successRate: 68,
    },
    {
      id: "3",
      title: "اختبار سنة 2022",
      category: "lawyer",
      year: "2022",
      questionsCount: 50,
      participants: 180,
      successRate: 72,
    }
  ];

  const filteredTests = mockTests.filter(
    (test) =>
      test.category === currentTab &&
      test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTest = () => {
    toast({
      title: "إضافة اختبار جديد",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleEditTest = (testId: string) => {
    toast({
      title: "تعديل الاختبار",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleDeleteTest = (testId: string) => {
    toast({
      title: "حذف الاختبار",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
        <Button onClick={handleAddTest} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة اختبار جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              عدد الاختبارات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockTests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              مجموع المشاركين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockTests.reduce((acc, test) => acc + test.participants, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              متوسط نسبة النجاح
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(
                mockTests.reduce((acc, test) => acc + test.successRate, 0) /
                  mockTests.length
              )}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الاختبارات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-9"
            />
          </div>
        </div>

        <Tabs defaultValue="lawyer" onValueChange={(v) => setCurrentTab(v as "lawyer" | "other")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lawyer">اختبارات المحاماة</TabsTrigger>
            <TabsTrigger value="other">اختبارات أخرى</TabsTrigger>
          </TabsList>

          <TabsContent value="lawyer" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاختبار</TableHead>
                      <TableHead>عدد الأسئلة</TableHead>
                      <TableHead>عدد المشاركين</TableHead>
                      <TableHead>نسبة النجاح</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.title}</TableCell>
                        <TableCell>{test.questionsCount}</TableCell>
                        <TableCell>{test.participants}</TableCell>
                        <TableCell>{test.successRate}%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditTest(test.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteTest(test.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                لا توجد اختبارات متوفرة حالياً في هذا القسم
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QCMDashboard;