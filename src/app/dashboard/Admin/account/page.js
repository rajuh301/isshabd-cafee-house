
import React from 'react';
import Account from './Account';
import LeftNav from '../LeftNav';

const AcceptOrder = () => {




    return (
        <div className='flex'>
            <div>
             
                {/* <LeftNav/> */}
            </div>

            <div className='mx-10 text-center'>
                <p className='text-center mb-5 text-2xl font-extrabold text-primary'>
                    Account
                </p>

                <Account />

            </div>
        </div>
    );
};

export default AcceptOrder;