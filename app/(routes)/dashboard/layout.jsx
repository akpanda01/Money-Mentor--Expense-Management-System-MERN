"use client"
import React, { useEffect } from 'react';
import SideNav from './_components/SideNav';  // Correct named import from the relative path
import DashboardHeader from './_components/DashboardHeader';
import { budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/dbConfig';

function DashboardLayout({ children }) {
  
  const {user} = useUser();
  const router = useRouter();
  useEffect(()=>{
    user&&checkUserBudgets();
  },[user])

  const checkUserBudgets = async () => {
    console.log(db); // Check if db is defined and initialized
    const result = await db
      .select()
      .from(budgets)
      .where(eq(budgets.createdBy, user.primaryEmailAddress.emailAddress));
  
    console.log(result);
    if (result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  };  
  
  return (
    <div>
      <div className = 'fixed md:w-64 hidden md:block'>
        <SideNav />
      </div>
      <div className = 'md:ml-64'>
        <DashboardHeader/>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;