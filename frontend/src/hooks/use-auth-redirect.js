import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';

export function useAuthRedirect() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSessionChecked, setIsSessionChecked] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (currentUserDataJSON) {
			const currentUserData = JSON.parse(currentUserDataJSON);
			dispatch(setUser(currentUserData));
			setIsLoggedIn(true);
		}

		setIsSessionChecked(true);
	}, [dispatch]);

	useEffect(() => {
		const guestRoutes = ['/', '/login', '/register'];
		if (isLoggedIn && guestRoutes.includes(location.pathname)) {
			navigate('/'); // автоматический переход на карту
		}
	}, [isLoggedIn, location.pathname, navigate]);

	return { isLoggedIn, isSessionChecked, setIsLoggedIn };
}
