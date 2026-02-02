import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    type?: "neutral" | "accent" | "danger" | "success";
}

export const Badge: React.FC<BadgeProps> = ({ children, type = "neutral" }) => {
    const styles = {
        neutral: "bg-white/5 text-gray-400 border-white/5",
        accent: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
    return (
        <span className={`px-2 py-0.5 text-[10px] font-mono font-medium border rounded ${styles[type]}`}>
            {children}
        </span>
    );
};
