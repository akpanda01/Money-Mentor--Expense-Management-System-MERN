"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { budgets, expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { index } from "drizzle-orm/mysql-core";

function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]); // State for the budget list
  const [isClient, setIsClient] = useState(false); // Track if running on the client

  useEffect(() => {
    setIsClient(true); // Ensure rendering happens only on the client
  }, []);

  useEffect(() => {
    if (isClient && user) {
      getBudgetList();
    }
  }, [isClient, user]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(budgets),
          totalSpend: sql`SUM(CAST(${expenses.amount} AS NUMERIC))`.mapWith(Number),
          totalItem: sql`COUNT(${expenses.id})`.mapWith(Number),
        })
        .from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(budgets.id)
        .orderBy(desc(budgets.id));

      setBudgetList(result); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render the CreateBudget component */}
        <div>
          <CreateBudget refreshData={() => getBudgetList()} />
        </div>

        {/* Conditionally render budget items */}
        {isClient ? (
          budgetList.length > 0 ? (
            budgetList.map((budget) => (
              <div key={budget.id}>
                <BudgetItem budget={budget} key = {index} />
              </div>
            ))
          ) : [1,2,3,4,5].map((item,index) => (
            <div 
            key={index} className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse">
          </div>
          ))
        ) : (
          <p>Loading budgets...</p>
        )}
      </div>
    </div>
  );
}

export default BudgetList;
