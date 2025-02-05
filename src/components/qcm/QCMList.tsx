import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QCMCategory } from "@/types/qcm";
import TestList from "@/pages/qcm/TestList";
import FirstYearTestList from "@/pages/qcm/FirstYearTestList";

const QCMList = () => {
  const [currentTab, setCurrentTab] = useState<QCMCategory>("lawyer");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lawyer" onValueChange={(v) => setCurrentTab(v as QCMCategory)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lawyer">مناظرات المحاماة</TabsTrigger>
          <TabsTrigger value="subject">المواد القانونية</TabsTrigger>
          <TabsTrigger value="other">مناظرات أخرى</TabsTrigger>
        </TabsList>

        <TabsContent value="lawyer">
          <TestList category="lawyer" />
        </TabsContent>

        <TabsContent value="subject">
          <Card>
            <CardContent className="p-6">
              <FirstYearTestList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              لا توجد اختبارات متوفرة حالياً في هذا القسم
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCMList;