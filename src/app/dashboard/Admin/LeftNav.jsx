'use client'
import Link from 'next/link';
import React from 'react';


const LeftNav = () => {


    return (
        <div>
            {

                <div className='bg-slate-800 w-40 h-screen'>
                    <p className='text-white font-bold text-center py-5'>Admin Panal</p>

                    {/* ----------------------------- */}


                    <Link href='dashboard/addproduct'>
                        <p className="block text-white font-bold text-center py-1 hover:text-green-400  cursor-pointer">Add Product</p>
                    </Link>

                    <Link href='dashboard/orderproduct'>
                        <p className="block text-white font-bold text-center py-1 hover:text-green-400  cursor-pointer">Order Product</p>
                    </Link>

                    <Link href='dashboard/account'>
                        <p className="block text-white font-bold text-center py-1 hover:text-green-400  cursor-pointer">Account</p>
                    </Link>

                    <Link href='dashboard/manageproduct'>
                        <p className="block text-white font-bold text-center py-1 hover:text-green-400  cursor-pointer">Manage Product</p>
                    </Link>

                    {/* ----------------------------- */}

                </div>}
                
        </div>
    );
};

export default LeftNav;