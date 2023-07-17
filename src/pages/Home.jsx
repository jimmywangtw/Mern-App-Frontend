import React, { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])



    return (
        <div className='max-w-screen-lg mx-auto my-0 p-5 flex gap-5'>
            <div className='w-3/4'>
                {workouts && workouts.map(workout => (
                    < WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <div className='w-1/4 '>
                <WorkoutForm />
            </div>
        </div>
    );
}

export default Home;