import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, UserX, Ban, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "طالب",
    status: "نشط",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "سارة علي",
    email: "sara@example.com",
    role: "مدرب",
    status: "نشط",
    joinDate: "2024-02-01",
  },
  // Add more mock users as needed
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  const handleBanUser = (userId: string) => {
    toast({
      title: "تم حظر المستخدم",
      description: "تم حظر المستخدم بنجاح",
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح",
    });
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.includes(searchQuery) ||
      user.email.includes(searchQuery);
    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <Button variant="outline" className="gap-2">
          <span>تصدير البيانات</span>
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            className="pl-4 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="تصفية حسب الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأدوار</SelectItem>
            <SelectItem value="طالب">طالب</SelectItem>
            <SelectItem value="مدرب">مدرب</SelectItem>
            <SelectItem value="مشرف">مشرف</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الانضمام</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حظر المستخدم</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حظر هذا المستخدم؟ لن يتمكن من الوصول إلى حسابه.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleBanUser(user.id)}>
                            حظر
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف المستخدم</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;