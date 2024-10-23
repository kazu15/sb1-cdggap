import React from 'react';

interface SelectedNumbersProps {
  numbers: number[];
}

export function SelectedNumbers({ numbers }: SelectedNumbersProps) {
  return (
    <div>
      <p className="text-[30px] mb-2">発表済番号:</p>
      <div className="text-[250px] flex flex-wrap gap-2">
        {numbers.map((num) => (
          <span key={num} className="bg-gray-100 rounded-full px-3 py-1 text-[65px] font-semibold text-gray-700">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}