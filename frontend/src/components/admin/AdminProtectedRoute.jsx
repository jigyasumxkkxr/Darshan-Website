import { isTokenExpired } from '@/lib/isTokenExpired';
import { setAuth, setToken } from '@/store/authSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';




export default function AdminPotectedRoute({children}) {
    const {user, token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        if(!user || !user.is_verified || user.role !== 'admin' || isTokenExpired(token) ) {
            dispatch(setAuth(null));
            dispatch(setToken(null));
            navigate('/admin/login');
        }
    }, [])
  return (
    <>{children}</>
  )
}
