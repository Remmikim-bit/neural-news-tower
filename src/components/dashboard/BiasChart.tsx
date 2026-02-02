import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { subject: 'Sentiment', A: 120, B: 110, fullMark: 150 },
    { subject: 'Factuality', A: 98, B: 130, fullMark: 150 },
    { subject: 'Depth', A: 86, B: 130, fullMark: 150 },
    { subject: 'Context', A: 99, B: 100, fullMark: 150 },
    { subject: 'Diversity', A: 85, B: 90, fullMark: 150 },
    { subject: 'Timeliness', A: 65, B: 85, fullMark: 150 },
];

export const BiasChart: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Conservative Bias"
                        dataKey="A"
                        stroke="#00f2ff"
                        strokeWidth={2}
                        fill="#00f2ff"
                        fillOpacity={0.1}
                    />
                    <Radar
                        name="Progressive Bias"
                        dataKey="B"
                        stroke="#ff0033"
                        strokeWidth={2}
                        fill="#ff0033"
                        fillOpacity={0.1}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-2 right-2 flex flex-col gap-1 text-[10px] text-gray-500">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-bloomberg-neon"></div> Eagle News</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-bloomberg-danger"></div> Global Daily</div>
            </div>
        </div>
    );
};
