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
      overlayClassName="modal-overlay"
      className={`modal modal-${size}`}
    >
      <ModalTitle onRequestClose={onRequestClose} title={modalTitle} />
      <div className="modal-content">{children}</div>
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
    <div className="modal-header">
      <h6 className="modal-title">{title}</h6>
      <button
        onClick={onRequestClose}
        className="material-symbols-outlined modal-close"
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
  return <div className="modal-footer">{modalFooter}</div>;
};
