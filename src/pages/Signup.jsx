import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md my-10 mx-auto p-5 bg-white rounded'>
            <h3 className='text-center text-2xl font-bold mb-10 mt-3'>Sign up</h3>

            <div className='flex flex-col'>
                <label>Email: </label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='border-2 border-slate-400 rounded mt-2 hover:border-slate-500 p-1'
                    autoComplete='email'
                />
                <label className='mt-5'>Password: </label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='border-2 border-slate-400 rounded mt-2 hover:border-slate-500 p-1'
                    autoComplete='off'
                />
                <span className='text-red-500 text-sm mt-2'>At least 8 characters including a number, a lowercase letter and a uppercase letter.</span>
            </div>

            <button disabled={isLoading} className='mt-10 mb-5 mx-auto bg-slate-300 rounded p-2 hover:bg-slate-400 flex justify-center '>Sign up</button>
            {error && <div className='mt-5 border-2 text-center border-pink-500 text-pink-600 font-bold p-1 bg-pink-100 rounded'>{error}</div>}
        </form>
    );
}

export default Signup;