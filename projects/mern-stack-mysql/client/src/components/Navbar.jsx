import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='bg-neutral-700 flex justify-between px-20 py-2'>
            <Link to="/" className='text-white font-bold'>
                <h1>
                    React Mysql
                </h1>
            </Link>
            <ul className='flex '>
                <li className='px-10'>
                    <Link to='/' className='bg-slate-200 px-2 py-1 rounded-md'>Home</Link>
                </li>
                <li>
                    <Link to='/new' className='bg-teal-200 px-2 py-1 rounded-md'>Create task</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
