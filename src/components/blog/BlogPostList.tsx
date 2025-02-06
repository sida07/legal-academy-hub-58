import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Post } from "@/types/blog";

interface BlogPostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: number) => void;
}

export const BlogPostList = ({ posts, onEditPost, onDeletePost }: BlogPostListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>العنوان</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead>المشاهدات</TableHead>
          <TableHead>التعليقات</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">
              <div>
                <p>{post.title}</p>
                <p className="text-sm text-gray-500">{post.seoTitle}</p>
              </div>
            </TableCell>
            <TableCell>{post.date}</TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell>{post.comments}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  post.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {post.status === "published" ? "منشور" : "مسودة"}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPost(post)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeletePost(post.id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};