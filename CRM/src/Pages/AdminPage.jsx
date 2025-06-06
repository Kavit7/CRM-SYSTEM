import { User, Upload, CheckCircle,XCircle} from 'lucide-react'
import { useState } from 'react'
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

  const handleReload = () => {
    window.location.reload()
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
        console.log(result.message)
      } else {
        setError(true)
        console.log(result.error)
      }
    } catch (err) {
      setError(true)
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

      {page.upload && (
        <div className='mt-10 bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-auto'>
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
