import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, Trophy } from "lucide-react";
import { useState } from "react";

const QCMStats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const stats = {
    totalExams: 45,
    passedExams: 32,
    successRate: 71,
  };

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
          اختبارات القانون
        </h1>
        <div className="flex gap-4 w-full md:w-auto">
          <Card className="flex-1 md:w-48 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">نسبة النجاح</p>
                  <p className="text-2xl font-bold text-green-500">{stats.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 md:w-48 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 justify-center">
                <Trophy className="h-5 w-5 text-primary" />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">الاختبارات المجتازة</p>
                  <p className="text-2xl font-bold text-primary">{stats.passedExams}/{stats.totalExams}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="relative w-full md:w-96 mx-auto">
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="ابحث عن اختبار..."
          className="pl-10 text-right bg-white/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QCMStats;