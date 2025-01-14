import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { toast } from 'sonner'; // Correct import for Sonner
import { budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';

function EditBudgets({ budgetInfo, onUpdate }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || '');
  const [amount, setAmount] = useState(budgetInfo?.amount || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon);
      setName(budgetInfo.name);
      setAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    if (!name && !amount) {
      toast.error('Please provide valid details to update');
      return;
    }

    try {
      setIsLoading(true);

      // Perform the update operation
      const result = await db
        .update(budgets)
        .set({
          ...(name && { name }), // Update `name` if changed
          ...(amount && { amount }), // Update `amount` if changed
          ...(emojiIcon && { icon: emojiIcon }), // Update `icon` if changed
        })
        .where(eq(budgets.id, budgetInfo.id));

      if (result) {
        toast.success('Budget Updated');

        // Immediately update the parent state (if callback is provided)
        if (onUpdate) {
          onUpdate({
            id: budgetInfo.id,
            name,
            amount,
            icon: emojiIcon,
          });
        }
      }
    } catch (error) {
      console.error('Error updating budget:', error);
      toast.error('Failed to update the budget. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 bg-blue-950"><PenBox /> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <Button variant="outline" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </Button>

              {openEmojiPicker && (
                <div>
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="mt-2">
                <label htmlFor="budget-name" className="text-black font-medium my-1">Budget Name</label>
                <Input
                  id="budget-name"
                  placeholder="e.g. Home Decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <label htmlFor="budget-amount" className="text-black font-medium my-1">Budget Amount</label>
                <Input
                  id="budget-amount"
                  placeholder="e.g. Rs. 500"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button
                disabled={isLoading || !(name || amount || emojiIcon)}
                onClick={onUpdateBudget}
                className="mt-5 w-full"
              >
                {isLoading ? 'Updating...' : 'Update Budget'}
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudgets;
