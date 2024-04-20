'use client'

import { useEffect, useState } from "react";

const Account = () => {

    const [orderss, setOrderss] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/order');
                const data = await res.json();
                setOrderss(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);





    const today = new Date().toLocaleDateString(); // Get today's date in MM/DD/YYYY format
    const accepted = orderss?.filter(ord => ord.status === 'done' && ord.date.split(',')[0] === today);
    const acceptedAll = orderss?.filter(ord => ord.status === 'done');


    // ------------- Date Functtion ----------
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedDate)

    const dateAmount = orderss?.filter(ord => ord.status === 'done' && ord.date.split(',')[0] === selectedDate);
    // ------------- Date Functtion ----------
    return (
        <div className=" rounded shadow-lg">
            {/* <p>{today}</p> */}

            <div className="flex gap-4 ">

                <div className="border p-2 flex">
                    <p className="font-bold">Todays Amount: {
                        accepted?.reduce((acc, order) => {
                            return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                        }, 0)
                    }</p>
                </div>

                <div className="border p-2 flex">
                    <p className="font-bold">Total Amount: {
                        acceptedAll?.reduce((acc, order) => {
                            return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                        }, 0)
                    }</p>
                </div>

                {/* -------------- date ------------ */}
                <div className="border ">
                    Select Date <br />
                    <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                    {/* -------------------- */}
                    <div className="border p-2 flex">
                        <p className="font-bold">Total Amount: {
                            dateAmount?.reduce((acc, order) => {
                                return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                            }, 0)
                        }</p>
                    </div>
                    {/* -------------------- */}
                </div>
                {/* -------------- date ------------ */}


                {/* ---------------- Cash out Section --------------- */}
                <div className="border p-2">
                    <p className="font-bold">Cashout Amount</p>

                    <div> 
                        <input placeholder="Input Amount" type="number" required className="bg-slate-400 rounded p-2 text-white "  />
                    </div>

                </div>
                {/* ---------------- Cash out Section --------------- */}

            </div>

        </div>


    );
};

export default Account;