import { useState } from "react";
import QCMHeader from "./QCMHeader";
import QCMStats from "./QCMStats";
import QCMList from "./QCMList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";

const QCMLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <QCMHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
        <QCMStats />
        
        <Tabs defaultValue="lawyer" className="space-y-6">
          <TabsList className="w-full justify-start bg-white/50 backdrop-blur-sm border border-primary/10">
            <TabsTrigger value="lawyer" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              اختبارات مناظرة المحاماة
            </TabsTrigger>
            <TabsTrigger value="other" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              اختبارات مناظرات أخرى
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lawyer" className="space-y-6 animate-fade-in">
            <QCMList />
          </TabsContent>

          <TabsContent value="other" className="animate-fade-in">
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 p-8 rounded-lg text-center space-y-4">
              <h3 className="text-2xl font-bold mb-2">اختبارات مناظرات أخرى</h3>
              <p className="text-muted-foreground mb-4">قريباً...</p>
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/5 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QCMLayout;