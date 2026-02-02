import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    rightContent?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, rightContent }) => (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
            {Icon && <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400"><Icon size={14} /></div>}
            <div>
                <h3 className="text-sm font-bold text-gray-100 tracking-wider uppercase font-sans">{title}</h3>
                {subtitle && <p className="text-[10px] text-gray-500 font-mono tracking-tight mt-0.5">{subtitle}</p>}
            </div>
        </div>
        {rightContent}
    </div>
);
