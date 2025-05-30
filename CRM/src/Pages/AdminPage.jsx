import {User} from 'lucide-react'
import '@fontsource/roboto/500.css'
const AdminPage = () => {
  const now = new Date()

const options = {
  weekday: 'long', // e.g., Monday
  year: 'numeric', // e.g., 2025
  month: 'long',   // e.g., May
  day: 'numeric',  // e.g., 30
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true     // for AM/PM format
}
const formatted = now.toLocaleString('en-US', options)


  return (
    <>
    <header className="shadow-lg text-blue-500 top-0 fixed w-full">
      <h1 className="text-center p-2 bg-blue-500 text-white w-fit mx-auto rounded mt-2 mb-2">Admin Panel</h1>
      <div className="flex flex-row justify-between">
      <h1 className="p-2 text-2xl font-roboto font-sans font-serif">Welcome! Kavit </h1>
      <h1>{formatted}</h1>
      <h1 className="mr-4 flex"><User className='text-gray-500 bg-white rounded-[20px] mr-4 shadow-lg ' size={35}/> Profile </h1>
      </div>
    </header>

    <nav className='mt-[120px] ml-[100px] flex'>
      <ul className='flex mx-auto'>
        <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li>
         <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li>
         <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li>
         <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li>
        <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li> 
        <li className='mr-3 rounded shadow-lg p-2 text-blue-500'>Upload product</li> 




      </ul>
    </nav>
    
    </>
  )
}

export default AdminPage