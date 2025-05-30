import { User, Upload } from 'lucide-react'
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

  const [page, setPage] = useState({ upload: false })
  const [formdata, setFormdata] = useState({
    image: null,
    title: '',
    description: '',
    amount: '',
    status: '',
  })

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
        alert(result.message)
        console.log(result.message)
      } else {
        alert(result.error)
        console.log(result.error)
      }
    } catch (err) {
      alert("Something went wrong. Please try again.")
      console.log(err)
    }
  }

  return (
    <>
      <header className="shadow-lg text-blue-500 top-0 fixed w-full bg-white">
        <h1 className="text-center p-2 bg-blue-500 text-white w-fit mx-auto rounded mt-2 mb-2">Admin Panel</h1>
        <div className="flex flex-row justify-between">
          <h1 className="p-2 text-2xl font-roboto font-sans font-serif">Welcome! Kavit</h1>
          <h1>{formatted}</h1>
          <h1 className="mr-4 flex">
            <User className='text-gray-500 bg-white rounded-[20px] mr-4 shadow-lg' size={35} /> Profile
          </h1>
        </div>
      </header>

      <nav className='mt-[120px] ml-[100px] flex '>
        <ul className='flex mx-auto'>
          <li
            className='mr-3 rounded shadow-lg p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-700 hover:cursor-pointer transition duration-300 ease-in text-[25px]'
            onClick={() => setPage(prev => ({ ...prev, upload: !prev.upload }))}
          >
            Upload product
          </li>
        </ul>
      </nav>

      {page.upload && (
        <div className='mt-7 flex flex-col items-center p-8 shadow-lg w-[60%] mx-auto shadow-lg rounded-[20px] mb-6'>
          <Upload size={34} className="text-white text-7xl bg-blue-600 rounded hover:cursor-pointer" />
          <form className='mt-5 flex-col flex shadow-lg w-full p-5 hover:cursor-pointer' onSubmit={handlesubmit}>
            <label className='float-left text-blue-500 text-1xl mb-2'>Upload Image Product</label>
            <input
              type='file'
              onChange={(e) => setFormdata({ ...formdata, image: e.target.files[0] })}
              className='bg-gray-300 p-2 rounded border border-gray-400 mb-2 hover:cursor-pointer'
            />
            <label className='text-blue-500 text-1xl mb-2'>Set Title of the Product</label>
            <input
              type='text'
              value={formdata.title}
              onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
              className='border border-gray-400 p-2 outline-none rounded hover:cursor-pointer'
            />
            <label className='text-blue-500 text-1xl mb-2'>Description about product</label>
            <textarea
              value={formdata.description}
              onChange={(e) => setFormdata({ ...formdata, description: e.target.value })}
              className='border border-gray-400 outline-none rounded hover:cursor-pointer'
            ></textarea>
            <label className='text-blue-500 text-1xl'>Amount</label>
            <input
              type='number'
              value={formdata.amount}
              onChange={(e) => setFormdata({ ...formdata, amount: e.target.value })}
              className='border border-gray-400 p-2 outline-none rounded mb-6 hover:cursor-pointer'
            />
            <select
              value={formdata.status}
              onChange={(e) => setFormdata({ ...formdata, status: e.target.value })}
              className='text-blue-500 text-1xl border border-gray-400 p-2 outline-none rounded hover:cursor-pointer '
            >
              <option value=''>Choose Status</option>
              <option value='Sold'>Sold</option>
              <option value='Not sold'>Not sold</option>
            </select>
            <button className='bg-blue-500 mt-4 rounded p-2 text-white hover:cursor-pointer'>Upload</button>
          </form>
        </div>
      )}
    </>
  )
}

export default AdminPage
