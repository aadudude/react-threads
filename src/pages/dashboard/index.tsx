import {logout} from "../../features/user/userSlice.ts";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../app/store.ts";

export const Dashboard = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}