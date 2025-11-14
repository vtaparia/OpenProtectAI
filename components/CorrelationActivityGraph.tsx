
import React from 'react';
import { ActivityIcon } from './icons/ActivityIcon';

interface CorrelationActivityGraphProps {
  activityData: number[]; // Array of numbers representing activity levels
}

const CorrelationActivityGraph: React.FC<CorrelationActivityGraphProps> = ({ activityData }) => {
  const maxActivity = Math.max(...activityData, 1); // Avoid division by zero

  return (
    <div>
        <h3 className="text-base font-bold text-gray-300 mb-3 flex items-center gap-2">
            <ActivityIcon />
            Real-Time Correlation Activity
        </h3>
        <div className="flex items-end justify-between h-24 bg-gray-900/50 p-2 rounded-md space-x-1">
            {activityData.map((value, index) => {
                const heightPercentage = (value / maxActivity) * 100;
                return (
                    <div
                        key={index}
                        className="w-full bg-gradient-to-t from-teal-600 to-cyan-500 rounded-t-sm transition-all duration-300 ease-in-out"
                        style={{ height: `${heightPercentage}%` }}
                        title={`Activity: ${value.toFixed(1)}`}
                    />
                );
            })}
        </div>
    </div>
  );
};

export default CorrelationActivityGraph;
