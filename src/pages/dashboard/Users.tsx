import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  UsersIcon, 
  Trash2, 
  Ban, 
  Mail,
  UserCog,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface User {
  id: number;
  name: string;
  email: string;
  status: "نشط" | "محظور";
  role: "مشرف" | "مدرب" | "طالب";
  joinedAt: string;
}

// Temporary mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    status: "نشط",
    role: "طالب",
    joinedAt: "2024-01-01",
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    status: "نشط",
    role: "مدرب",
    joinedAt: "2024-01-15",
  },
  {
    id: 3,
    name: "محمد علي",
    email: "mohamed@example.com",
    status: "محظور",
    role: "طالب",
    joinedAt: "2024-02-01",
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا المستخدم؟");
    
    if (confirmDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast({
        title: "تم حذف المستخدم بنجاح",
        description: "تم حذف المستخدم من النظام",
      });
    }
  };

  const handleStatusChange = (id: number) => {
    setUsers(users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "نشط" ? "محظور" : "نشط" }
        : user
    ));
    
    toast({
      title: "تم تحديث حالة المستخدم",
      description: "تم تحديث حالة المستخدم بنجاح",
    });
  };

  const handleRoleChange = (id: number, newRole: "مشرف" | "مدرب" | "طالب") => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "تم تحديث دور المستخدم",
      description: "تم تحديث دور المستخدم بنجاح",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="h-6 w-6" /> إدارة المستخدمين
          </CardTitle>
          <Button asChild variant="default">
            <Link to="/dashboard/users/new">إضافة مستخدم جديد</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="🔍 بحث عن المستخدمين..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="تصفية حسب الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="طالب">طالب</SelectItem>
                  <SelectItem value="مدرب">مدرب</SelectItem>
                  <SelectItem value="مشرف">مشرف</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="محظور">محظور</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHead>
                <TableRow className="bg-muted/50">
                  <TableCell className="font-semibold">الاسم</TableCell>
                  <TableCell className="font-semibold">البريد الإلكتروني</TableCell>
                  <TableCell className="font-semibold">الدور</TableCell>
                  <TableCell className="font-semibold">الحالة</TableCell>
                  <TableCell className="font-semibold">تاريخ الانضمام</TableCell>
                  <TableCell className="font-semibold">إجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select 
                        value={user.role} 
                        onValueChange={(value: "مشرف" | "مدرب" | "طالب") => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="طالب">طالب</SelectItem>
                          <SelectItem value="مدرب">مدرب</SelectItem>
                          <SelectItem value="مشرف">مشرف</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "نشط"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.joinedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleStatusChange(user.id)}
                          title={user.status === "نشط" ? "حظر المستخدم" : "إلغاء الحظر"}
                        >
                          <Ban className={`h-4 w-4 ${user.status === "محظور" ? "text-red-500" : ""}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          title="إرسال بريد إلكتروني"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          title="إعدادات المستخدم"
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(user.id)}
                          title="حذف المستخدم"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
