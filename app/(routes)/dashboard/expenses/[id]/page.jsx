"use client";
import { db } from "@/utils/dbConfig";
import { budgets, expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseListTable from "./_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudgets from "./_components/EditBudgets";

function Expenses({ params: paramsPromise }) {
  const { user } = useUser();
  const params = React.use(paramsPromise); // Unwrap the `params` promise

  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();
  
  useEffect(() => {
    if (user && params.id) {
      getBudgetInfo();
    }
  }, [params, user]);

  const getBudgetInfo = async () => {
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
        .where(eq(budgets.id, params.id));
      getExpenseList();
      setbudgetInfo(result[0]);
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(expenses)
      .where(eq(expenses.budgetId, params.id))
      .orderBy(desc(expenses.id));
    setExpensesList(result);
    console.log(result);
  };

  const deleteBudget = async () => {
    try {
      const result = await db.delete(budgets).where(eq(budgets.id, params.id)).returning();

      if (result) {
        // Show success toast message
        toast("Budget deleted successfully!");
        route.replace('/dashboard/budgets');
      } else {
        // Show error toast message if the result is empty
        toast("Failed to delete the budget.");
      }

      console.log(result);
    } catch (error) {
      toast("An error occurred while deleting the budget.");
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      {/* Header and delete button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">My Expenses</h2>
        
        <div className="flex gap-2 items-center">
          <EditBudgets budgetInfo={budgetInfo}/>
        

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2" variant="destructive">
              <Trash /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current budget and its expenses and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </div>

      {/* Budget info and add expense form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
        )}
        <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
      </div>

      {/* Expense list */}
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
}

export default Expenses;
