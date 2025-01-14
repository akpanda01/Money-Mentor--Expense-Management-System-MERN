import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState(''); // Set initial state to an empty string
  const [amount, setAmount] = useState(''); // Set initial state to an empty string

  const addNewExpense = async () => {
    const result = await db
      .insert(expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format('DD/MM/yyyy'),
      })
      .returning({ insertedId: budgets.id });

    console.log(result);

    if (result) {
      // Reset the input fields after adding the expense
      setName('');
      setAmount('');
      
      refreshData(); // Refresh the data to reflect the added expense
      toast('New Expense Added!');
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 10000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)} // Disable button if name or amount is empty
        className="mt-3 w-full"
        onClick={addNewExpense} // Call function to add expense
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
