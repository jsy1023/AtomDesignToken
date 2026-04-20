"use client";
import { useState } from "react";
import { Button } from "@/app/templates/Button/Button";
import { ModalContent } from "@/app/templates/Modal/Modal";
import { Input } from "@/app/templates/Input/Input";


export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="primary">
        모달 열기
      </Button>
      <ModalContent
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        modalTitle="모달 제목"
        modalFooter={
          <div className="flex justify-end gap-2 w-full mt-4">
            <Button type="gray" onClick={() => setIsOpen(false)}>취소</Button>
            <Button type="primary" onClick={() => setIsOpen(false)}>확인</Button>
          </div>
        }
      >
        <Input placeholder="내용을 입력하세요" />
      </ModalContent>
    </>
  );
}
