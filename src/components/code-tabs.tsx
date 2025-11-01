"use client";

import { CodeBlock } from "@/components/code/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeTabsProps {
  globalCss: string;
  componentCode: string;
}

export function CodeTabs({ globalCss, componentCode }: CodeTabsProps) {
  return (
    <Tabs defaultValue="global">
      <TabsList className="w-full justify-between">
        <TabsTrigger value="global">global.css</TabsTrigger>
        <TabsTrigger value="component">component.tsx</TabsTrigger>
      </TabsList>
      <TabsContent value="global">
        <CodeBlock code={globalCss} language="css" filename="global.css" />
      </TabsContent>
      <TabsContent value="component">
        <CodeBlock
          code={componentCode}
          language="tsx"
          filename="component.tsx"
        />
      </TabsContent>
    </Tabs>
  );
}
