import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutsContext()

    const logout = () => {
        // clear localStorage
        localStorage.removeItem('user')

        // dispatch LOGOUT
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout };
}
