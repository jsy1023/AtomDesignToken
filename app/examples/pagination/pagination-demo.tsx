"use client";
import { useState } from "react";
import Pagination from "@/app/templates/Pagination/Pagination";

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      pageViewRange={10}
      pageRange={5}
      pageTotal={20}
    />
  );
}
