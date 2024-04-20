
import React from 'react';
import ManageProducts from './ManageProducts';
import LeftNav from '../LeftNav';


const ManageProduct = () => {
    return (
        <div className='flex'>
        <div>
            {/* <LeftNav /> */}
        </div>

        <div className='mx-10'>
            Manage Product
          <ManageProducts/>
        </div>
    </div>
    );
};

export default ManageProduct;