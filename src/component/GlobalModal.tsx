// export default Modal;
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  classNameMainDiv?: string;
  classNameMain?: string;
  "data-is-open"?: boolean;
  customRender?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainDivProps: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainProps: any,
    children: ReactNode
  ) => React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  children,
  classNameMainDiv = "",
  classNameMain = "",
  "data-is-open": dataIsOpen,
  customRender,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const mainDivProps = {
    className: classNameMainDiv,
    onClick: handleOverlayClick,
  };

  const mainProps = {
    className: classNameMain,
    "data-is-open": dataIsOpen,
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  };

  if (customRender) {
    return customRender(mainDivProps, mainProps, children);
  }

  return (
    <div {...mainDivProps}>
      <div {...mainProps}>{children}</div>
    </div>
  );
};

export default Modal;
