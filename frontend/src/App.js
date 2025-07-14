import { Route, Routes } from 'react-router-dom';
import {
	Authorization,
	Greeting,
	Registration,
	UserProfile,
	MapPage,
	Analytics,
	TravelsPage,
	TravelDetailsPage,
	DreamsPage,
	DreamDetailsPage,
	PublishedTravels,
} from './Pages';
import { Error, Header, Modal } from './components';
import { useDispatch } from 'react-redux';
import { ERROR } from './constants/error';
import { useAuthRedirect } from './hooks';
import { useEffect } from 'react';
import { request } from './utils';
import { setUser } from './actions';

function App() {
	const { isLoggedIn, isSessionChecked, setIsLoggedIn } = useAuthRedirect();
	const dispatch = useDispatch();

	useEffect(() => {
		request('/user').then((res) => {
			if (res.data) {
				dispatch(setUser(res.data));
			}
		});
	}, [dispatch]);

	if (!isSessionChecked) {
		return <div>Загрузка...</div>;
	}
	return (
		<>
			{isLoggedIn ? (
				<>
					<Header setIsLoggedIn={setIsLoggedIn} />
					<Routes>
						<Route path="/" element={<MapPage />} />
						<Route path="/published-travels" element={<PublishedTravels />} />
						<Route path="/user" element={<UserProfile />} />
						<Route path="/travel" element={<TravelsPage />} />
						<Route path="/travel/:id" element={<TravelDetailsPage />} />
						<Route path="/travel/:id/edit" element={<TravelDetailsPage />} />
						<Route path="/dream" element={<DreamsPage />} />
						<Route path="/dream/:id" element={<DreamDetailsPage />} />
						<Route path="/dream/:id/edit" element={<DreamDetailsPage />} />
						<Route path="/analitics" element={<Analytics />} />
						<Route
							path="*"
							element={<Error error={ERROR.PAGE_NOT_EXIST} />}
						/>
					</Routes>
					<Modal />
				</>
			) : (
				<Routes>
					<Route path="/" element={<Greeting />} />
					<Route
						path="/login"
						element={<Authorization setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path="/register"
						element={<Registration setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			)}
		</>
	);
}

export default App;
