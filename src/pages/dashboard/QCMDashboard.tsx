import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Book,
  GraduationCap,
  Search,
  Users,
  BarChart,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Subject {
  id: string;
  title: string;
  progress: number;
  icon: "book" | "graduationCap" | "bookOpen";
}

const QCMDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"subjects" | "users">("subjects");

  const subjects: Subject[] = [
    {
      id: "civil",
      title: "القانون المدني",
      progress: 75,
      icon: "book",
    },
    {
      id: "criminal",
      title: "القانون الجنائي",
      progress: 60,
      icon: "graduationCap",
    },
    {
      id: "commercial",
      title: "القانون التجاري",
      progress: 30,
      icon: "bookOpen",
    },
  ];

  const iconMap = {
    book: Book,
    graduationCap: GraduationCap,
    bookOpen: BookOpen,
  };

  const handleStartTest = (subjectId: string) => {
    toast({
      title: "بدء الاختبار",
      description: `سيتم بدء اختبار ${subjects.find(s => s.id === subjectId)?.title}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
      </div>

      <Tabs defaultValue="subjects" onValueChange={(v) => setCurrentTab(v as "subjects" | "users")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subjects">اختبارات حسب المادة</TabsTrigger>
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = iconMap[subject.icon];
              return (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon className="h-6 w-6 text-primary" />
                        {subject.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Progress value={subject.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground text-right">
                        {subject.progress}% مكتمل
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleStartTest(subject.id)}
                    >
                      بدء الاختبار
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-4 pr-9"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>عدد الاختبارات</TableHead>
                      <TableHead>النتيجة</TableHead>
                      <TableHead>آخر نشاط</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">أحمد محمد</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>منذ ساعة</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCMDashboard;