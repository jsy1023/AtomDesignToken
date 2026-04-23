"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, Code2, Paintbrush } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/templates/Tab/Tab";
import { themes } from "@/build/typescript/theme";
import { Select } from "@/app/templates/Select/Select";

interface ComponentPreviewClientProps {
  children: React.ReactNode; // The live component preview
  source: React.ReactNode;   // The highlighted source code (ComponentSource)
  className?: string;
  previewClassName?: string;
  themeGroup?: string;
}

export function ComponentPreviewClient({
  children,
  source,
  className,
  previewClassName,
  themeGroup,
}: ComponentPreviewClientProps) {
  const availableThemes = themeGroup ? themes[themeGroup] || [] : [];
  const [selectedTheme, setSelectedTheme] = useState(availableThemes[0] || "");

  return (
    <div className={cn("relative my-6 flex flex-col", className)}>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="code">
            <div className="flex items-center space-x-2">
              <Code2 className="h-4 w-4" />
              <span>Code</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className={cn("relative flex flex-col gap-4", previewClassName)}>
            {availableThemes.length > 0 && (
              <div className="flex items-center justify-end gap-2 text-sm text-text-sub border-b border-border-standard pb-2 mb-4">
                <Paintbrush className="w-4 h-4" />
                <span>Theme:</span>
                <div className="w-[180px]">
                  <Select 
                    options={availableThemes}
                    value={selectedTheme}
                    onValueChange={(val) => setSelectedTheme(val)}
                    placeholder="테마 선택..."
                  />
                </div>
              </div>
            )}
            <div className={selectedTheme}>
              {children}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code">
          <div>{source}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

