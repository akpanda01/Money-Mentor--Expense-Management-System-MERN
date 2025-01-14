"use client";
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { budgets } from '@/utils/schema';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isMounted, setIsMounted] = useState(false); // To ensure client-side only rendering
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { user } = useUser();

  const onCreateBudget = async () => {
    if (!name || !amount) {
      toast.error('Please provide a valid budget name and amount');
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const result = await db.insert(budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: budgets.id });

      if (result) {
        refreshData();
        toast.success('New Budget Created');
        setName('');
        setAmount('');
        setEmojiIcon('😊'); // Reset emoji
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error('Failed to create the budget. Please try again later.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setIsMounted(true); // Ensure component is mounted on client side
  }, []);

  if (!isMounted) return null; // Prevent rendering on the server

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <Button variant="outline" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </Button>

              {openEmojiPicker && (
                <div>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g. Home Decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  placeholder="e.g. Rs. 500"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button
                disabled={isLoading || !(name && amount)}
                onClick={onCreateBudget}
                className="mt-5 w-full"
              >
                {isLoading ? 'Creating...' : 'Create Budget'}
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
