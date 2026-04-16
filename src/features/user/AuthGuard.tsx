import { Navigate, Outlet, useLocation } from "react-router"
import { useAppSelector } from "../../app/store.ts"
import { useCurrentQuery } from "../../app/services/userApi.ts"

export const AuthGuard = () => {
  const { isLoading } = useCurrentQuery()
  const location = useLocation()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  if (isLoading) return <p>Loading...</p>
  if (!isAuthenticated) {
    return <Navigate to='/auth' state={{ from: location }} replace/>
  }

  return <Outlet/>
}