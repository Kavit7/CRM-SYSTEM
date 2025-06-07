import { User, Upload, CheckCircle,XCircle} from 'lucide-react'
import { useState,useEffect } from 'react'
import '@fontsource/roboto/500.css'

const AdminPage = () => {
  const now = new Date()
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }
  const [products, setProducts] = useState([])
  const formatted = now.toLocaleString('en-US', options)
  const [success,setSuccess]=useState(false)
  const [page, setPage] = useState({ upload: false })
  const [formdata, setFormdata] = useState({
    image: null,
    title: '',
    description: '',
    amount: '',
    status: '',
  })
  const [error, setError] = useState(false)
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:4000/products');
      const data = await res.json();
      setProducts(data);

    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  fetchProducts();
}, []);

  const handleReload = () => {
    window.location.reload()
  }
const handleEdit = async (e, productId) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:4000/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: "Sold" })
    });

    const result = await response.json();

    if (response.ok) {
      // Optional: update local product list
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, status: "Sold" } : product
      );
      setProducts(updatedProducts);
      console.log("Product status updated successfully");
    } else {
      console.error("Update failed:", result.error);
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const handlesubmit = async (e) => {
  e.preventDefault()
  const data = new FormData()
  data.append('image', formdata.image)
  data.append('title', formdata.title)
  data.append('description', formdata.description)
  data.append('amount', formdata.amount)
  data.append('status', formdata.status)

  try {
    const response = await fetch('http://localhost:4000/upload', {
      method: "POST",
      body: data
    })
    const result = await response.json()
    if (response.ok) {
     setSuccess(true)
setPage(prev => ({ ...prev, upload: false }))
// Re-fetch latest products from the server
const res = await fetch('http://localhost:4000/products')
const data = await res.json()
setProducts(data)
      console.log(result.message)
    } else {
      setError(true)
      setPage(prev => ({ ...prev, upload: false })) // hide form
      console.log(result.error)
    }
  } catch (err) {
    setError(true)
    setPage(prev => ({ ...prev, upload: false })) // hide form
    console.log(err)
  }
}


  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-roboto">Welcome, Kavit</h1>
          <div className="flex flex-col justify-center items-center">
              <p className="text-sm">{formatted}</p>
              <h2 className="text-center mt-3 font-bold text-2xl bg-white text-blue-700 rounded-full w-fit mx-auto px-5 py-1 shadow-md">Admin Panel</h2>
          </div>
          <div className="flex items-center gap-2">
            <User className='text-white bg-blue-700 p-1 rounded-full shadow-md' size={35} />
            <span className="text-white text-lg">Profile</span>
          </div>
        </div>
      </header>

      {error && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl'>
            <XCircle className="mx-auto text-red-600 w-12 h-12 mb-3" />
            <h1 className='font-semibold text-lg text-green-700'>Something went Wrong. Please Check data to the Form if are correctly</h1>
            <button
              onClick={handleReload}
              className='mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow transition'
            >
            OK
            </button>
          </div>
        </div>
      )}
        {success && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl'>
            <CheckCircle className="mx-auto text-green-600 w-12 h-12 mb-3" />
            <h1 className='font-semibold text-lg text-green-700'>Data added successfully ....</h1>
            <button
              onClick={handleReload}
              className='mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow transition'
            >
              OK
            </button>
          </div>
        </div>
      )}

      <nav className='mt-16 flex justify-center'>
        <ul className='flex gap-4'>
          <li
            onClick={() => setPage(prev => ({ ...prev, upload: !prev.upload }))}
            className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
            Add Product
          </li>
          <li
           className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
            Edit Product
          </li>
          <li
           className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
            Customers
          </li>
            <li
           className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
            Reports
          </li>
            <li
           className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
            Trending
          </li>
            <li
           className='bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-blue-200 transition cursor-pointer'
          >
           Top 5 Best Customer
          </li>
        </ul>
      </nav>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
  {products.map((product, index) => (
    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
       src={`http://localhost:4000/${product.image_path.replace(/\\/g, '/')}`} // adjust path
        alt={product.title}
        className="w-full h-70 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-600 font-semibold mt-2 line-through"><span className="line-through decoration-yellow-400">${product.amount}</span></p>
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${product.status === 'Sold' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {product.status}
        </span>
        <span>
          {product.status !== 'Sold' && (
  <button
    onClick={(e) => handleEdit(e,product.id)}
    className='bg-green-400 ml-3 px-3 rounded-full py-1 text-sm hover:cursor-pointer'
  >
    Mark as Sold
  </button>
)}

</span>
      </div>
    </div>
  ))}
</div>


      {page.upload && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl z-50'>
          <div className="flex justify-center mb-4">
            <Upload size={40} className="text-white bg-blue-600 p-2 rounded-full shadow-md" />
          </div>
          <form onSubmit={handlesubmit} className='space-y-5'>
            <div>
              <label className='block text-blue-700 font-semibold mb-1'>Upload Product Image</label>
              <input
                type='file'
                onChange={(e) => setFormdata({ ...formdata, image: e.target.files[0] })}
                className='w-full bg-gray-100 p-2 rounded border border-gray-300 text-gray-800'
              />
            </div>
            <div>
              <label className='block text-blue-700 font-semibold mb-1'>Product Title</label>
              <input
                type='text'
                value={formdata.title}
                onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
                className='w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-800'
              />
            </div>
            <div>
              <label className='block text-blue-700 font-semibold mb-1'>Product Description</label>
              <textarea
                value={formdata.description}
                onChange={(e) => setFormdata({ ...formdata, description: e.target.value })}
                className='w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-800'
              />
            </div>
            <div>
              <label className='block text-blue-700 font-semibold mb-1'>Amount</label>
              <input
                type='number'
                value={formdata.amount}
                onChange={(e) => setFormdata({ ...formdata, amount: e.target.value })}
                className='w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-800'
              />
            </div>
            <div>
              <label className='block text-blue-700 font-semibold mb-1'>Status</label>
              <select
                value={formdata.status}
                onChange={(e) => setFormdata({ ...formdata, status: e.target.value })}
                className='w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-800'
              >
                <option value=''>Choose Status</option>
                <option value='Sold'>Sold</option>
                <option value='Not sold'>Not Sold</option>
              </select>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 transition'
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </>
  )
}
export default AdminPage
