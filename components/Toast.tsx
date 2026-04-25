import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-rose-400" size={20} />,
    info: <Info className="text-sky-400" size={20} />,
  };

  const bgStyles = {
    success: "border-emerald-500/20 bg-emerald-500/10",
    error: "border-rose-500/20 bg-rose-500/10",
    info: "border-sky-500/20 bg-sky-500/10",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`fixed bottom-8 right-8 z-9999 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[300px] max-w-md ${bgStyles[type]}`}
        >
          <div className="shrink-0">{icons[type]}</div>
          <p className="flex-1 text-sm font-medium text-slate-200">{message}</p>
          <button
            onClick={onClose}
            className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
          
          {/* Progress Bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={`absolute bottom-0 left-0 h-0.5 rounded-full ${
              type === "success"
                ? "bg-emerald-500"
                : type === "error"
                ? "bg-rose-500"
                : "bg-sky-500"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
