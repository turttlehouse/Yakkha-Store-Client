import React from "react";

interface ConfirmationModalProps {
  isOpen?: boolean;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black opacity-50 w-full h-full absolute"></div>
        <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
          <p className="text-lg mb-4">{message}</p>

          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-red-500 px-2 rounded py-1 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="bg-green-500 px-2 rounded py-1 text-white hover:bg-green-600"
              onClick={onCancel}
            >
              No
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
