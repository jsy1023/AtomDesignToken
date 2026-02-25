"use client";
import { useState } from "react";
import { Button } from "@/app/templates/Button/Button";
import { ModalContent } from "@/app/templates/Modal/Modal";
import { Input } from "@/app/templates/Form/Form";

export default function ModalPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="primary">
        모달 열기
      </Button>
      <ModalContent
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        modalTitle="모달제목"
        modalFooter={
          <Button onClick={() => setIsOpen(false)} type="primary">
            닫기
          </Button>
        }
      >
        <Input />
      </ModalContent>
    </>
  );
}
