'use client'
import React, { useState } from 'react';
import Swal from 'sweetalert2';



const AddNewProduct = () => {


  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const uploadImage = async (event) => {
    const formData = new FormData();
    if (!event.target.files[0]) return;

    formData.append("image", event.target.files[0]);

    Swal.fire({
      title: 'Image uploading...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=6f87abdac0fb402333249a265cb47024`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      Swal.close();
      Swal.fire('Success', 'Image uploaded successfully!', 'success');
      setProductImage(data.data.url);
    } catch (error) {
      Swal.close();
      Swal.fire('Error', 'Image not uploaded!', 'error');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: productName,
      price: productPrice,
      description: productDescription,
      image: productImage,
      category: category,
      showDisplay: true,
      rating: 1
    };

    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch('https://isshabd-server.vercel.app/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.close();
        Swal.fire('Success', 'Product added successfully', 'success');

        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
        setCategory('');
        setError('');
      } else {
        Swal.close();
        Swal.fire('Error', data.message || 'Error adding product', 'error');
      }
    } catch (err) {
      Swal.close();
      Swal.fire('Error', 'Error adding product: ' + err.message, 'error');
    }
  };

  return (
    <div className=''>
      <div className="container mx-auto mt-2 border shadow-2xl px-5 py-1 rounded-xl">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>


          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Dessert">Dessert</option>
              <option value="Soups">Soups</option>
              <option value="Fast-food">Fast-food</option>
              <option value="Drinks">Drinks</option>
              <option value="Ice-Cream">Ice Cream</option>
              <option value="All Product">All Product</option>
            </select>
          </div>



          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="mt-1 p-2 w-full h-32 border rounded-md"
              required
            ></textarea>
          </div>


          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Upload Product Image</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              onChange={uploadImage}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;