import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');


    const handleDeleteClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }


    }

    const handleUpdateClick = async () => {
        if (!user) {
            return
        }

        const updatedWorkout = { title, load, reps }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedWorkout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
            setIsEditing(false)
        }
    }

    const handleCancelClick = () => {
        setTitle(workout.title)
        setLoad(workout.load)
        setReps(workout.reps)
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing ? (
                <>
                    <div className='my-5 mx-auto p-5 relative shadow-xl bg-green-500 rounded-lg flex justify-between'>
                        <div>
                            <div className='mb-2.5 '>
                                <input
                                    type='text'
                                    placeholder={workout.title}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className='text-xl font-bold text-black'
                                />
                            </div>
                            <div>
                                <label className='my-0.5 text-sm'>Load (kg): </label>
                                <input
                                    type='number'
                                    placeholder={workout.load}
                                    value={load}
                                    onChange={e => setLoad(e.target.value)}
                                    className='text-sm text-black'
                                    required
                                />
                            </div>
                            <div>
                                <label className='my-0.5 text-sm'>Number of Reps: </label>
                                <input
                                    type='number'
                                    placeholder={workout.reps}
                                    value={reps}
                                    onChange={e => setReps(e.target.value)}
                                    className='text-sm text-black'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button onClick={handleUpdateClick} className='bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mx-3'>Save</button>
                            <button onClick={handleCancelClick} className='bg-orange-500 text-white p-2 rounded hover:bg-orange-600 '>Cancel</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='my-5 mx-auto p-5 relative shadow-xl bg-green-500 rounded-lg flex justify-between'>
                        <div>
                            <h2 className='mb-2.5 text-xl text-yellow-200 font-bold'>{workout.title}</h2>
                            <p className='my-0.5 text-sm'>Load (kg): {workout.load}</p>
                            <p className='my-0.5 text-sm'>Number of Reps: {workout.reps}</p>
                            <p className='mt-3 text-sm '>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
                        </div>
                        <div>
                            <button onClick={() => {
                                if (user) {
                                    setIsEditing(true)
                                }
                            }} className='bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mx-3'>Edit</button>
                            <button onClick={handleDeleteClick} className='bg-orange-500 text-white p-2 rounded hover:bg-orange-600 '>Delete</button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}


WorkoutDetails.propTypes = {
    workout: PropTypes.shape({
        title: PropTypes.string.isRequired,
        load: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
        updatedAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),

}

export default WorkoutDetails;