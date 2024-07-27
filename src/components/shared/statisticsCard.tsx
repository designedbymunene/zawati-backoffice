import React from "react";

interface StatisticsCardProps {
  icon: React.ReactNode;
  title: string;
  stats: string | number | undefined;
  color: string;
}

const StatisticsCard = ({
  icon,
  title,
  stats,
  color = "green",
}: StatisticsCardProps) => {
  return (
    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-slate-300 dark:border-slate-800">
      <div className="p-4 flex items-center">
        <div
          className={`p-3 rounded-full text-${color}-500 dark:text-${color}-100 bg-${color}-100 dark:bg-${color}-500 mr-4 `}
        >
          {icon}
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {stats}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
