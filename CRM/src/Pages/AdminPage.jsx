import { User, Upload, CheckCircle, XCircle, Edit, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
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
  const [success, setSuccess] = useState(false)
  const [page, setPage] = useState({ upload: false })
  const [formdata, setFormdata] = useState({
    image: null,
    title: '',
    description: '',
    amount: '',
    status: '',
  })
  const [error, setError] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    amount: '',
    status: ''
  })

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

  const handleEditSubmit = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/products/edit/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      })

      const result = await response.json()

      if (response.ok) {
        const updatedProducts = products.map(product => 
          product.id === productId ? { ...product, ...editFormData } : product
        )
        setProducts(updatedProducts)
        setEditingId(null)
        console.log("Product updated successfully")
      } else {
        console.error("Update failed:", result.error)
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

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
        const res = await fetch('http://localhost:4000/products')
        const data = await res.json()
        setProducts(data)
        console.log(result.message)
      } else {
        setError(true)
        setPage(prev => ({ ...prev, upload: false }))
        console.log(result.error)
      }
    } catch (err) {
      setError(true)
      setPage(prev => ({ ...prev, upload: false }))
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-gray-50 mt-4">
  {products.map((product, index) => (
    <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={`http://localhost:4000/${product.image_path.replace(/\\/g, '/')}`}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
          product.status === 'Sold' 
            ? 'bg-red-500/90 text-white' 
            : 'bg-emerald-500/90 text-white'
        }`}>
          {product.status}
        </span>
      </div>

      {/* Product Content */}
      <div className="p-5 text-gray-600">
        {editingId === product.id ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={editFormData.amount}
                  onChange={(e) => setEditFormData({...editFormData, amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="Not sold">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => handleEditSubmit(product.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-900">
                ${product.amount}
              </div>
              
              {product.status !== 'Sold' && (
                <button
                  onClick={(e) => handleEdit(e, product.id)}
                  className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-1 px-3 rounded-full transition-colors"
                >
                  Mark as Sold
                </button>
              )}
            </div>
            
            <button
              onClick={() => {
                setEditingId(product.id)
                setEditFormData({
                  title: product.title,
                  description: product.description,
                  amount: product.amount,
                  status: product.status
                })
              }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Edit size={18} /> Edit Product
            </button>
          </>
        )}
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