import React from 'react';

interface GlassContainerProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = "", noPadding = false }) => (
    <div className={`relative group backdrop-blur-md bg-white/[0.02] border border-white/[0.08] shadow-2xl rounded-sm overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] ${className}`}>
        {/* Top Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className={`${noPadding ? '' : 'p-5'}`}>{children}</div>
    </div>
);
