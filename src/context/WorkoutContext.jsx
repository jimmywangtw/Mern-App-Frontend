import React, { createContext, useReducer } from "react";
import PropTypes from 'prop-types';

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(w => w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT': {

            const updatedWorkout = state.workouts.map(w => {
                if (w._id === action.payload._id) {
                    return action.payload
                }
                return w
            })
            return {
                workouts: updatedWorkout
            }
        }
        default:
            return state;

    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })


    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

WorkoutsContextProvider.propTypes = {
    children: PropTypes.any
}