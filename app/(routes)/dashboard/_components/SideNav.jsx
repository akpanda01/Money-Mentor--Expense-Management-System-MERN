"use client";

import { UserButton } from '@clerk/nextjs';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function SideNav() {
  const path = usePathname(); // Use usePathname to get the current path

  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expense', icon: ReceiptText, path: '/dashboard/budgets' },
    { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard' }
  ];

  useEffect(() => {
    console.log(path); // Log current pathname for debugging
  }, [path]);

  return (
    <div className="bg-slate-100 h-screen p-3 pl-10 border shadow-md">
      <Image src={'/logo.svg'} alt="logo" width={160} height={100} />
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex gap-2 items-center font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-gray-300 mb-2
                ${path === menu.path && 'text-primary'}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-3 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
