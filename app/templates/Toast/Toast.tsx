"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ✅ Toast Message 타입 정의
export type ToastMessage = {
  id: string;
  status: "success" | "error";
  message: string;
  desc?: string;
};

// ✅ 전역 메시지 저장소와 구독 시스템
let messages: ToastMessage[] = [];
let listener: ((messages: ToastMessage[]) => void) | null = null;

export const addToast = (msg: Omit<ToastMessage, "id">) => {
  const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
  messages = [...messages, { id, ...msg }];
  //   messages 값 listener에 반영
  listener?.(messages);
};

const removeToast = (id: string) => {
  messages = messages.filter((m) => m.id !== id);
  listener?.(messages);
};

// 콜백으로 message value 추적적
const subscribeToast = (cb: (messages: ToastMessage[]) => void) => {
  listener = cb;
  cb(messages);
};

const unsubscribeToast = () => {
  listener = null;
};

// ✅ useToast 훅 제공
export const useToast = () => {
  return addToast;
};

// ✅ ToastContainer 컴포넌트 (내부 ToastItem 포함)
export const Toast = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    subscribeToast(setMessages);
    return () => unsubscribeToast();
  }, []);

  return (
    <div className="fixed flex flex-col gap-2 bottom-[24px] right-[24px] z-50">
      {messages.map((message) => (
        <ToastItem
          key={message.id}
          message={message}
          remove={() => removeToast(message.id)}
        />
      ))}
    </div>
  );
};

const ToastItem = ({
  message,
  remove,
}: {
  message: ToastMessage;
  remove: () => void;
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elRef.current) return;

    const tl = gsap.timeline({ onComplete: remove });
    tl.from(elRef.current, {
      opacity: 0,
      y: 50,
      ease: "power4.out",
    });

    tl.to(elRef.current, {
      delay: 3,
      y: 50,
      opacity: 0,
      ease: "power4.out",
    });
  }, []);

  return (
    <div
      ref={elRef}
      className="bg-[var(--background-card)] border border-[var(--color-border)] rounded text-white p-4 shadow-md min-w-[250px]"
    >
      <p>{message.message}</p>
      {message.desc ? <p className="text-sm">{message.desc}</p> : null}
    </div>
  );
};
