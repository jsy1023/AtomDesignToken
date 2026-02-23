"use client";

import { useState } from "react";
import Pagination from "@/app/templates/Pagination/Pagination";

export default function PaginationDemo() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex justify-center w-full">
      <Pagination
        currentPage={active}
        onPageChange={(page) => setActive(page)}
        pageViewRange={10}
        pageRange={5}
        totalCount={80}
      />
    </div>
  );
}
