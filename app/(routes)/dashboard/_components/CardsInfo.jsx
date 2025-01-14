import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";

function CardsInfo({ budgetList = [] }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching/loading
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulates a 1-second loading delay
    return () => clearTimeout(timeout);
  }, []);

  // Memoized calculations
  const { totalBudget, totalSpend } = React.useMemo(() => {
    const totalBudget = budgetList.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalSpend = budgetList.reduce((sum, item) => sum + item.totalSpend, 0);
    return { totalBudget, totalSpend };
  }, [budgetList]);

  // Conditional Rendering: Loading vs. Cards
  return isLoading ? (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((item, index) => (
        <div
          key={index}
          className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  ) : (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-200 p-7 border rounded-lg flex item-center justify-between">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">Rs. {totalBudget}</h2>
        </div>
        <PiggyBank className="bg-blue-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="bg-blue-200 p-7 border rounded-lg flex item-center justify-between">
        <div>
          <h2 className="text-sm">Total Expenditure</h2>
          <h2 className="font-bold text-2xl">Rs. {totalSpend}</h2>
        </div>
        <ReceiptText className="bg-blue-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="bg-blue-200 p-7 border rounded-lg flex item-center justify-between">
        <div>
          <h2 className="text-sm">No. of Budgets</h2>
          <h2 className="font-bold text-2xl">{budgetList.length}</h2>
        </div>
        <Wallet className="bg-blue-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>
    </div>
  );
}

export default CardsInfo;
