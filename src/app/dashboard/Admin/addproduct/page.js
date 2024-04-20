
import React from 'react';
import AddNewProduct from './AddNewProduct';
import LeftNav from '../LeftNav';





const addproductPage = () => {
    return (
        <div className='flex'>
            <div>
                {/* <LeftNav /> */}
            </div>

            <div className='mx-auto'>
             <p className='font-bold'>Add Product</p>
        <AddNewProduct/>
            </div>
        </div>
    );
};

export default addproductPage;