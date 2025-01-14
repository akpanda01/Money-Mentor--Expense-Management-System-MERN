import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader() {
  return (
    <div className='bg-slate-100 p-5 shadow-sm border-b flex justify-between'>
      {/* Add other header content here */}
      
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
