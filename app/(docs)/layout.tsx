"use client";

import Link from "next/link";

import GlobalNav from "../component/GlobalNav/GlobalNav";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex h-full`}>
      <GlobalNav />
      <div className="w-full bg-fill-wrapper text-text-standard flex flex-col items-center relative overflow-auto">
        <div className="max-w-[800px] w-full px-4 py-12 lg:px-0 lg:py-24">
          {children}
        </div>
        <footer className="w-full py-4 px-8 border-t border-fill-border">
          Built by{" "}
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
    </div>
  );
};

export default DocsLayout;
