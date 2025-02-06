import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SEOFields } from "@/components/blog/SEOFields";
import { ImageOptimization } from "@/components/blog/ImageOptimization";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash, Tag, ChartBar } from "lucide-react";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  views: number;
  comments: number;
  status: "published" | "draft";
  date: string;
  image?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string;
  altText?: string;
}

interface NewPost {
  title: string;
  content: string;
  image?: File;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  altText: string;
}

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "مقدمة في القانون المدني",
      excerpt: "شرح مبسط لأساسيات القانون المدني وتطبيقاته في الحياة اليومية",
      content: "محتوى المقال الكامل هنا...",
      views: 1234,
      comments: 23,
      status: "published",
      date: "2024-03-15",
      seoTitle: "دليل شامل للقانون المدني | موقع القانون",
      metaDescription: "تعرف على أساسيات القانون المدني وتطبيقاته العملية في الحياة اليومية. دليل مبسط للمبتدئين.",
      keywords: "قانون مدني، حقوق، التزامات، عقود",
      altText: "صورة توضيحية لمفهوم القانون المدني",
    },
  ]);

  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    content: "",
    seoTitle: "",
    metaDescription: "",
    keywords: "",
    altText: "",
  });

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setEditedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedPost || !editedPost.title || !editedPost.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setPosts(posts.map((post) =>
      post.id === selectedPost.id ? { ...post, ...editedPost } : post
    ));

    toast({
      title: "تم التحديث",
      description: "تم تحديث المقال بنجاح",
    });

    setIsEditDialogOpen(false);
    setSelectedPost(null);
    setEditedPost({});
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المقال بنجاح",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost((prev) => ({ ...prev, image: file }));
    }
  };

  const handleNewPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const newPostData: Post = {
      id: posts.length + 1,
      title: newPost.title,
      excerpt: newPost.content.substring(0, 100) + "...",
      content: newPost.content,
      views: 0,
      comments: 0,
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      seoTitle: newPost.seoTitle,
      metaDescription: newPost.metaDescription,
      keywords: newPost.keywords,
      altText: newPost.altText,
    };

    setPosts([newPostData, ...posts]);
    setNewPost({
      title: "",
      content: "",
      seoTitle: "",
      metaDescription: "",
      keywords: "",
      altText: "",
    });
    setIsNewPostDialogOpen(false);

    toast({
      title: "تم الإضافة",
      description: "تم إضافة المقال بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">إدارة المدونة</h2>
        <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="ml-2 h-4 w-4" />
              مقال جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>إضافة مقال جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-right block">
                    عنوان المقال
                  </label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    placeholder="أدخل عنوان المقال"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-right block">
                    محتوى المقال
                  </label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    placeholder="أدخل محتوى المقال"
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">تحسين محركات البحث (SEO)</h3>
                <SEOFields
                  seoTitle={newPost.seoTitle}
                  metaDescription={newPost.metaDescription}
                  keywords={newPost.keywords}
                  onSEOTitleChange={(value) => setNewPost({ ...newPost, seoTitle: value })}
                  onMetaDescriptionChange={(value) => setNewPost({ ...newPost, metaDescription: value })}
                  onKeywordsChange={(value) => setNewPost({ ...newPost, keywords: value })}
                />
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">تحسين الصور</h3>
                <ImageOptimization
                  altText={newPost.altText}
                  onAltTextChange={(value) => setNewPost({ ...newPost, altText: value })}
                  onImageUpload={handleImageUpload}
                />
              </Card>

              <Button onClick={handleNewPost} className="w-full">
                نشر المقال
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ChartBar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">إجمالي المقالات</p>
              <p className="text-2xl font-semibold">{posts.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">التصنيفات</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ChartBar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
              <p className="text-2xl font-semibold">2.1K</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
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
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تعديل المقال</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-right block">
                  عنوان المقال
                </label>
                <Input
                  id="edit-title"
                  value={editedPost.title || ""}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                  placeholder="أدخل عنوان المقال"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-content" className="text-right block">
                  محتوى المقال
                </label>
                <Textarea
                  id="edit-content"
                  value={editedPost.content || ""}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, content: e.target.value })
                  }
                  placeholder="أدخل محتوى المقال"
                  className="min-h-[200px]"
                />
              </div>
            </div>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">تحسين محركات البحث (SEO)</h3>
              <SEOFields
                seoTitle={editedPost.seoTitle || ""}
                metaDescription={editedPost.metaDescription || ""}
                keywords={editedPost.keywords || ""}
                onSEOTitleChange={(value) => setEditedPost({ ...editedPost, seoTitle: value })}
                onMetaDescriptionChange={(value) => setEditedPost({ ...editedPost, metaDescription: value })}
                onKeywordsChange={(value) => setEditedPost({ ...editedPost, keywords: value })}
              />
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">تحسين الصور</h3>
              <ImageOptimization
                altText={editedPost.altText || ""}
                onAltTextChange={(value) => setEditedPost({ ...editedPost, altText: value })}
                onImageUpload={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditedPost({ ...editedPost, image: file });
                  }
                }}
              />
            </Card>

            <Button onClick={handleSaveEdit} className="w-full">
              حفظ التغييرات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
