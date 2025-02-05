import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const QCMHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">الاختبارات</h1>
        <p className="text-muted-foreground mt-1">
          اختبارات تجريبية في مختلف المواد القانونية
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/qcm/subjects")}
        >
          المواد القانونية
        </Button>
        <Button onClick={() => navigate("/qcm/year1")}>
          السنة الأولى
        </Button>
      </div>
    </div>
  );
};

export default QCMHeader;