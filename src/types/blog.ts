export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  views: number;
  comments: number;
  status: "published" | "draft";
  date: string;
  image?: string;
  imageFile?: File;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  altText: string;
}

export interface NewPost {
  title: string;
  content: string;
  imageFile?: File;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  altText: string;
}