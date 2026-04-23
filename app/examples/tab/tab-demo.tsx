"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/templates/Tab/Tab";

export default function TabDemo() {
  return (
    <div className="w-full">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">탭 1</TabsTrigger>
          <TabsTrigger value="tab2">탭 2</TabsTrigger>
          <TabsTrigger value="tab3">탭 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <p>탭 1의 콘텐츠입니다.</p>
        </TabsContent>
        <TabsContent value="tab2">
          <p>탭 2의 콘텐츠입니다.</p>
        </TabsContent>
        <TabsContent value="tab3">
          <p>탭 3의 콘텐츠입니다.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
