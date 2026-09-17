import React from 'react';

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
      <p className="text-sm font-medium text-slate-800">
        {message}
      </p>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;