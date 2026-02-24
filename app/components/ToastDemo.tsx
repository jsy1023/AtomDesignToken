"use client";

import { Button } from "@/app/templates/Button/Button";
import { useToast } from "@/app/templates/Toast/Toast";

export const ToastDemo = () => {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2 justify-center w-full">
      <Button
        type="gray"
        onClick={() => {
          toast({
            status: "standard",
            message: "기본 알림입니다.",
          });
        }}
      >
        Standard
      </Button>
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "primary",
            message: "Primary 토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        Primary
      </Button>
      <Button
        type="secondary"
        onClick={() => {
          toast({
            status: "secondary",
            message: "Secondary 토스트 알림입니다.",
          });
        }}
      >
        Secondary
      </Button>
      <Button
        type="success"
        onClick={() => {
          toast({
            status: "success",
            message: "성공적으로 처리되었습니다.",
          });
        }}
      >
        Success
      </Button>
      <Button
        type="danger"
        onClick={() => {
          toast({
            status: "danger",
            message: "에러가 발생했습니다.",
          });
        }}
      >
        Danger
      </Button>
      <Button
        type="warning"
        onClick={() => {
          toast({
            status: "warning",
            message: "경고 알림입니다.",
          });
        }}
      >
        Warning
      </Button>
      <Button
        type="gray"
        onClick={() => {
          toast({
            status: "info",
            message: "정보 알림입니다.",
          });
        }}
      >
        Info
      </Button>
    </div>
  );
};
