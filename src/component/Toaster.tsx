"use Client";
import React, { useEffect, useState } from "react";
import { Check, CircleX } from "lucide-react";
import checked from "../../assets/hms-icons/checkWhite.png";
import Modal from "./GlobalModal";
import { Slide } from "react-awesome-reveal";
import { ApiResponse } from "../types/ApiResponse";

interface ToasterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isresponse: ApiResponse;
}

const Toaster: React.FC<ToasterProps> = ({ isOpen, setIsOpen, isresponse }) => {
  const [exiting, setExiting] = useState(false);

  // Handle click anywhere on the screen
  useEffect(() => {
    const handleClick = () => {
      handleClose();
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setExiting(true);
    setIsOpen(false);
    setExiting(false);
    // Match the exit animation duration (0.5s)
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);
  const displayMessage =
    typeof isresponse.message === "string"
      ? isresponse.message
      : JSON.stringify(isresponse.message);
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      classNameMainDiv="fixed top-2 right-0 z-50 w-full h-10 p-4 rounded-md flex justify-end items-center transition-all"
      classNameMain={`flex justify-center items-center ${
        exiting ? "exit-animation" : ""
      }`}
    >
      <Slide direction="right" triggerOnce={false}>
        <div
          className={`flex gap-3 rounded-md p-4 ${
            isresponse.success ? "bg-lime-600" : "bg-red-500"
          }`}
        >
          <div>
            {isresponse.success ? (
              <Check color="white " className="cursor-pointer" />
            ) : (
              <CircleX
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
              />
            )}
          </div>
          <div className="text-center text-white">{displayMessage}</div>
        </div>
      </Slide>
    </Modal>
  );
};

export default Toaster;
