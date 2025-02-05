
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UsersIcon, Trash2, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  status: "نشط" | "محظور";
  joinedAt: string;
}

// Temporary mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    status: "نشط",
    joinedAt: "2024-01-01",
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    status: "نشط",
    joinedAt: "2024-01-15",
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers(users.filter((user) => user.id !== id));
      toast({
        title: "تم حذف المستخدم بنجاح",
        duration: 3000,
      });
    }
  };

  const handleBan = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "نشط" ? "محظور" : "نشط" }
          : user
      )
    );
    toast({
      title: "تم تحديث حالة المستخدم",
      duration: 3000,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UsersIcon className="h-6 w-6" /> إدارة المستخدمين
      </h1>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="🔍 بحث عن المستخدمين..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button asChild>
          <Link to="/dashboard/users/new">➕ إضافة مستخدم</Link>
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>الاسم</TableCell>
            <TableCell>البريد الإلكتروني</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>تاريخ الانضمام</TableCell>
            <TableCell>إجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter(
              (user) =>
                user.name.includes(search) || user.email.includes(search)
            )
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={
                      user.status === "نشط" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.joinedAt}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleBan(user.id)}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
