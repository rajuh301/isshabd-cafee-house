'use client'
import Loading from '@/app/loading';
// import Loding from '@/app/publicuse/Loading';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const ManageProducts = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/products');
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProduct();
    }, []);

    const toggleDisplay = async (id) => {
        setLoading(true);

        const productToUpdate = product.find((pro) => pro._id === id);
        const updatedProduct = {
            ...productToUpdate,
            showDisplay: !productToUpdate.showDisplay,
        };

        const updatedProducts = [...product.filter((pro) => pro._id !== id), updatedProduct];

        setProduct(updatedProducts);

        try {
            await fetch(`https://isshabd-server.vercel.app/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ showDisplay: updatedProduct.showDisplay }),
            });

            setLoading(false);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            setLoading(false);
            console.error('Error updating product:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to update product",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className=''>
            <div className='flex text-center'>
                {loading && <Loading />}
            </div>

            <div className='grid grid-cols-3'>
                {product?.map((pro) => (
                    <div key={pro._id} className='gap-10 p-5'>
                        <div className="card w-72 bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{pro.name}</h2>
                                <p>Price : {pro.price}</p>

                                <img
                                    src={pro.image}
                                    alt={pro.name}
                                    style={{ filter: pro.showDisplay=== true ? 'none' : 'grayscale(100%)' }}
                                    className="w-full h-auto mb-4"
                                />
                                <div className="card-actions justify-end">
                                    <button
                                        className={`btn ${pro.showDisplay === false ? 'btn-secondary bg-slate-500' : 'btn-primary'}`}
                                        onClick={() => toggleDisplay(pro._id)}
                                        disabled={loading}
                                    >
                                        {pro.showDisplay ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProducts;
