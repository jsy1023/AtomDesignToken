"use client";

import ReactModal from "react-modal";
import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
  modalFooter: React.ReactNode;
  size?: "normal" | "middle" | "large" | "xl" | "full" | "full-screen";
};

export const ModalContent = ({
  isOpen,
  onRequestClose,
  children,
  modalTitle,
  modalFooter,
  size = "normal",
}: ModalProps) => {
  useEffect(() => {
    ReactModal.setAppElement("#modal-root"); // 접근성 설정
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      className={`bg-[var(--modal-background)] p-0 rounded shadow-md w-full flex flex-col ${size === "normal" ? "max-w-md" : size === "middle" ? "max-w-xl" : size === "large" ? "max-w-5xl" : size === "xl" ? "max-w-6xl" : size === "full" ? "max-w-screen" : size === "full-screen" ? "w-screen h-screen" : null}`}
    >
      <ModalTitle onRequestClose={onRequestClose} title={modalTitle} />
      <div className="p-4 w-full h-full">{children}</div>
      <ModalFooter modalFooter={modalFooter} />
    </ReactModal>
  );
};

export const Modal = () => {
  return <div id="modal-root"></div>;
};

type ModalTitleProps = {
  title: string;
  onRequestClose: () => void;
};

export const ModalTitle = ({ title, onRequestClose }: ModalTitleProps) => {
  return (
    <div className="flex justify-between py-3 px-4">
      <h6>{title}</h6>
      <button
        onClick={onRequestClose}
        className="material-symbols-outlined cursor-pointer"
      >
        close
      </button>
    </div>
  );
};

export const ModalFooter = ({
  modalFooter,
}: {
  modalFooter: React.ReactNode;
}) => {
  return <div className="flex justify-end py-3 px-4">{modalFooter}</div>;
};
