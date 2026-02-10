import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

interface PastelButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
    icon?: boolean;
}

export function PastelButton({
    children,
    onClick,
    variant = "primary",
    className = "",
    icon = false,
}: PastelButtonProps) {
    const baseStyles =
        "px-6 py-3 rounded-full font-bold shadow-md transition-all flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-brand-teal text-white hover:bg-[#9AD8C0]",
        secondary: "bg-white text-brand-text border-2 border-brand-pink hover:bg-gray-50",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
            {icon && <MoveRight className="w-5 h-5" />}
        </motion.button>
    );
}
