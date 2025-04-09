import Link from "next/link";

import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
import { ThemeSelector } from "../templates/Theme/Theme";
import { Card } from "../templates/Card/Card";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalNav />
      <div className="w-full bg-[var(--background-wrapper)] grid grid-cols-1 md:grid-cols-4 overflow-auto">
        <div className="col-span-3 flex flex-col items-center order-2 md:order-1">
          <div className="max-w-[800px] min-w-0 h-full p-4">{children}</div>
          <footer className="w-full py-4 px-8 ">
            Built by
            <Link
              href={"https://www.atomground.com"}
              target="_blank"
              className="text-primary"
            >
              atomground
            </Link>
            . MIT License
          </footer>
        </div>
        <div className="relative col-span-1 p-4 order-1 md:order-2 ">
          <Card className="sticky top-[16px]">
            <ThemeSelector type="all" />
          </Card>
        </div>
      </div>
    </>
  );
};

export default DocsLayout;
