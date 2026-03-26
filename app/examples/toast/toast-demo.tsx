"use client";
import { addToast } from "@/app/templates/Toast/Toast";
import { Button } from "@/app/templates/Button/Button";

export default function ToastDemo() {
  return (
    <div className="flex gap-3 flex-wrap items-center justify-center">
      <Button type="primary" onClick={() => addToast({ status: "primary", message: "Primary 토스트입니다." })}>
        Primary
      </Button>
      <Button type="success" onClick={() => addToast({ status: "success", message: "성공 메시지입니다." })}>
        Success
      </Button>
      <Button type="danger" onClick={() => addToast({ status: "danger", message: "오류가 발생했습니다." })}>
        Danger
      </Button>
      <Button type="warning" onClick={() => addToast({ status: "warning", message: "주의가 필요합니다." })}>
        Warning
      </Button>
    </div>
  );
}
