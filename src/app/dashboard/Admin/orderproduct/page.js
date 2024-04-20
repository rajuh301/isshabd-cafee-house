
import React from 'react';
import OrdersPages from './OrdersPage';
import LeftNav from '../LeftNav';

const OrderPage = () => {
    return (
        <div className='flex'>
            <div>
                {/* <LeftNav /> */}
            </div>

            <div>
                <p className='text-center text-2xl font-extrabold'>
                    Order Product
                </p>
                <OrdersPages />
            </div>
        </div>
    );
};

export default OrderPage;