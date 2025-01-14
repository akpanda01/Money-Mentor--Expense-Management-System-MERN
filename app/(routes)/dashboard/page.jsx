"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { budgets, expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      setLoading(true);
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

      setBudgetList(result);
      await getAllExpenses(); // Fetch expenses after fetching budgets
      setLoading(false);
    } catch (error) {
      setError("Error fetching budget list");
      setLoading(false);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: expenses.id,
          name: expenses.name,
          amount: expenses.amount,
          createdAt: expenses.createdAt,
        })
        .from(budgets)
        .rightJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(expenses.id));

      setExpensesList(result); // Set the expenses list to state
    } catch (error) {
      setError("Error fetching expenses list");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌</h2>
      <p className="text-blue-950">Here’s an update on how your money is performing.</p>
      <CardsInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expensesList={expensesList} // Pass expensesList to the table
            refreshData={() => getBudgetList()} // Function to refresh data
          />
        </div>
        <div className="ml-2 grid gap-2">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget) => (
            <BudgetItem budget={budget} key={budget.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
