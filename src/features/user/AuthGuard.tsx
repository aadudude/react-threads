import {Navigate, Outlet, useLocation} from "react-router";
import {useAppSelector} from "../../app/store.ts";

export const AuthGuard = () => {
    const location = useLocation()
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to='/auth' state={{from: location}} replace/>
    }

    return <Outlet/>
}