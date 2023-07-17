import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }
        if (response.ok) {
            setEmptyField([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }


    return (
        <form onSubmit={handleSubmit} className='my-5 p-5 flex flex-col bg-yellow-500 rounded-lg'>
            <h2 className='font-bold mb-3 text-lg'>Add a new Workout</h2>

            <label className='mb-1'>Workout Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`p-1 rounded ${emptyField && emptyField.includes('title') ? 'outline outline-pink-500' : ''}`}
            />
            <label className='mt-2'>Load (in Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={`p-1 rounded ${emptyField && emptyField.includes('load') ? 'outline outline-pink-500' : ''}`}
            />
            <label className='mt-2'>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={`p-1 rounded ${emptyField && emptyField.includes('reps') ? 'outline outline-pink-500' : ''}`}
            />

            <button className='mt-5 bg-yellow-700 w-fit mx-auto p-3 rounded-lg text-white hover:bg-yellow-800'>Add workout</button>
            {error && <div className='mt-5 border-2 text-center border-pink-500 text-pink-600 font-bold p-1 bg-pink-100 rounded'>{error}</div>}
        </form>
    );
}

export default WorkoutForm;