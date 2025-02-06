
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const QCMHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl font-bold">الاختبارات</h1>
            <p className="text-sm text-muted-foreground">
              اختبارات تجريبية في مختلف المواد القانونية
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCMHeader;
