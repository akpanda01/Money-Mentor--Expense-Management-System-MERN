import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {

  return (
    <Link
      href={'/dashboard/expenses/' + budget?.id}
    >
      <div>
      <div className="p-4 border border-gray-200 rounded-lg shadow-md">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-2 bg-slate-100 rounded-full">{budget?.icon}</h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray">{budget?.totalItem} Item</h2>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[#101b58] text-lg">Rs. {budget?.amount}</h2>
          </div>
        </div>
        <div className="mt-5">
          <div className="p-3 border border-gray-200 rounded-md ">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#101b58] text-xs">Rs. {budget?.totalSpend || 0} Spent</h2>
              <h2 className="text-[#101b58] text-xs">
                Rs. {(budget?.amount || 0) - (budget?.totalSpend || 0)} Remaining
              </h2>
            </div>
            <div className="w-full bg-slate-300 h-2 rounded-full">
              <div
                className="bg-[#101b58] h-2 rounded-full "
                style={{
                  width: `${((budget?.totalSpend || 0) / (budget?.amount || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
