"use client";

import { useState } from "react";

const Pagination = ({
  pageRange,
  pageViewRange,
  totalCount,
  pageTotal,
  currentPage,
  onPageChange,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
  /**  페이지당 데이터 개수 정보를 받습니다. */
  pageViewRange: number;
  /**  페이지네이션을 보여줄 최대 개수정보를 받습니다. */
  pageRange: number;
  /** 데이터의 총 개수를 받아 페이지당 데이터 개수로 나누어 총 페이지네이션 정보를 계산합니다. */
  totalCount?: number;
  /** 전체 페이지네이션의 토탈 정보를 받습니다. */
  pageTotal?: number;
}) => {
  const totalPages = pageTotal
    ? pageTotal
    : totalCount
      ? Math.ceil(totalCount / pageViewRange)
      : 0;
  const [pageStart, setPageStart] = useState(1);
  const scrollTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="text-[#999] flex">
      <button
        disabled={pageStart === 1}
        onClick={() => {
          scrollTop();
          const newStart = Math.max(1, pageStart - pageRange);
          setPageStart(newStart);
          onPageChange(newStart);
        }}
        className="px-2 py-8 cursor-pointer disabled:opacity-40"
      >
        <span className="material-symbols-outlined">keyboard_arrow_left</span>
      </button>
      <ul className="flex w-full">
        {[...Array(pageRange)].map((_, i) => {
          const page = pageStart + i;

          const isFirstIndex = i === 0;
          const isLastIndex = i === pageRange - 1;
          const isLastPageInRange = page === totalPages;

          if (page > totalPages) return null;

          return (
            <li
              key={page}
              onClick={() => {
                onPageChange(page);

                // 첫 번째 인덱스 클릭 시 이전 범위로
                if (isFirstIndex && pageStart > 1) {
                  setPageStart(Math.max(1, pageStart - pageRange + 1));
                }

                // 마지막 인덱스 클릭 시 다음 범위로
                if (isLastIndex && !isLastPageInRange) {
                  setPageStart(pageStart + pageRange - 1);
                }
                scrollTop();
              }}
              className={` w-full text-center py-8 cursor-pointer px-2 ${
                currentPage === page ? "text-primary" : ""
              }`}
            >
              {page}
            </li>
          );
        })}
      </ul>
      <button
        disabled={pageStart + pageRange > totalPages}
        onClick={() => {
          scrollTop();
          const newStart = pageStart + pageRange;
          if (newStart <= totalPages) {
            setPageStart(newStart);
            onPageChange(newStart);
          }
        }}
        className="px-2 py-8 cursor-pointer disabled:opacity-40"
      >
        <span className="material-symbols-outlined">keyboard_arrow_right</span>
      </button>
    </div>
  );
};

export default Pagination;
