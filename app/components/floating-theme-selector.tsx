"use client";

import { useState } from "react";
import { Button } from "../templates/Button/Button";
import { ModalContent } from "../templates/Modal/Modal";
import { MarkdownEditor } from "../templates/Theme/Theme";

export default function FloatingThemeSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60]">
        <Button
          type="primary"
          id="floating-theme-btn"
          data-testid="floating-theme-btn"
          aria-label="디자인 가이드 (.md) 편집기 열기"
          onClick={() => setIsModalOpen(true)}
          className="!w-16 !h-16 !rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all !p-0"
        >
          <span className="material-symbols-outlined !text-3xl">edit_document</span>
        </Button>
      </div>

      <ModalContent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalTitle="디자인 가이드 (.md) 편집기"
        size="large"
        modalFooter={
          <div className="flex justify-end gap-2 w-full">
            <Button
              type="gray"
              id="modal-close-btn"
              data-testid="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </Button>
          </div>
        }
      >
        <div className="p-2">
          <MarkdownEditor onApply={() => setIsModalOpen(false)} />
        </div>
      </ModalContent>
    </>
  );
}

