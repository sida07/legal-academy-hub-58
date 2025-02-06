import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [level, setLevel] = useState("all");
  const [showFree, setShowFree] = useState(false);
  const [showCertified, setShowCertified] = useState(false);

  const handleSearch = () => {
    // تنفيذ البحث مع المعايير المحددة
    console.log({
      searchQuery,
      category,
      priceRange,
      level,
      showFree,
      showCertified,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4" dir="rtl">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="ابحث عن دورات، مقالات، اختبارات..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              خيارات متقدمة
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="text-right">خيارات البحث المتقدم</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">التصنيف</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التصنيفات</SelectItem>
                    <SelectItem value="civil">القانون المدني</SelectItem>
                    <SelectItem value="criminal">القانون الجنائي</SelectItem>
                    <SelectItem value="commercial">القانون التجاري</SelectItem>
                    <SelectItem value="administrative">القانون الإداري</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">نطاق السعر</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نطاق السعر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأسعار</SelectItem>
                    <SelectItem value="free">مجاني</SelectItem>
                    <SelectItem value="paid">مدفوع</SelectItem>
                    <SelectItem value="under-50">أقل من 50 دينار</SelectItem>
                    <SelectItem value="50-100">50 - 100 دينار</SelectItem>
                    <SelectItem value="above-100">أكثر من 100 دينار</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">المستوى</label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستويات</SelectItem>
                    <SelectItem value="beginner">مبتدئ</SelectItem>
                    <SelectItem value="intermediate">متوسط</SelectItem>
                    <SelectItem value="advanced">متقدم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="free"
                  checked={showFree}
                  onCheckedChange={(checked) => setShowFree(checked as boolean)}
                />
                <label
                  htmlFor="free"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  إظهار الدورات المجانية فقط
                </label>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="certified"
                  checked={showCertified}
                  onCheckedChange={(checked) => setShowCertified(checked as boolean)}
                />
                <label
                  htmlFor="certified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  الدورات المعتمدة فقط
                </label>
              </div>

              <Button onClick={handleSearch} className="w-full">
                تطبيق البحث
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdvancedSearch;