import './App.css';
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import AnotherPage from './pages/another';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import { useEffect, useState } from 'react';
import fetchData from './lib/fetchData';

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [isUserLoading, setIsUserLoading] = useState(false);
	const location = useLocation();

	useEffect(() => {
		async function getUser() {
			try {
				setIsUserLoading(true);
				const response = await fetchData('/api/v1/users/current-user', 'GET', undefined);
				setCurrentUser(response.user);
			} catch (error) {
				console.log(error);
				alert(error);
			} finally {
				setIsUserLoading(false);
			}
		}
		getUser();
	}, []);

	async function logoutHandler() {
		try {
			await fetchData('/api/v1/users/logout', 'GET', undefined);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}

	if (isUserLoading) {
		return <h1>Loading...</h1>;
	}

	const path = location.pathname;
	if (!currentUser && '/login' !== path && '/signup' !== path) {
		return <Navigate to='/login' />;
	}
	if (currentUser && '/login' === path) {
		return <Navigate to='/' />;
	}

	return (
		<>
			<nav>
				<ul>
					{!currentUser ? (
						<>
							<li>
								<Link to='/signup'>signup</Link>
							</li>
							<li>
								<Link to='/login'>login</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to='/'>Home</Link>
							</li>

							<li>
								<Link to='/another'>Another</Link>
							</li>
							<li>
								Hello,{currentUser.name}
								<Link onClick={logoutHandler} to='/another'>
									Logout
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>

			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/signup' exact element={<Signup />} />
				<Route exact path='/login' element={<Login />} />
				<Route path='/another' element={<AnotherPage />} />
			</Routes>
		</>
	);
}

export default App;
