
import React from 'react';

interface LWServerKnowledgeMeterProps {
  level: number; // A value between 0 and 100
  themeStyles: Record<string, string>;
}

const LWServerKnowledgeMeter: React.FC<LWServerKnowledgeMeterProps> = ({ level, themeStyles }) => {
  const safeLevel = Math.max(0, Math.min(100, level));

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-semibold ${themeStyles.textSecondary}`}>LWServer Knowledge Tier</span>
        <span className="text-sm font-bold text-violet-400">{safeLevel.toFixed(1)}%</span>
      </div>
      <div className={`w-full rounded-full h-2.5 ${themeStyles.meterBg}`}>
        <div
          className="bg-gradient-to-r from-purple-500 to-violet-400 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeLevel}%` }}
        ></div>
      </div>
       <p className="text-xs text-gray-500 text-center mt-2">Represents middle-tier processing efficiency</p>
    </div>
  );
};

export default LWServerKnowledgeMeter;
