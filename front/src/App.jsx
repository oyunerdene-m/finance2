import './App.css';
import { useContext } from 'react';
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './context/currentUser-context';
import fetchData from './lib/fetchData';
import Home from './pages/home';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import CreateAccount from './components/Accounts/NewAccount/CreateAccount';
import EditAccount from './components/Accounts/EditAccount';
import Accounts from './pages/accounts';

function App() {
	const { currentUser, isUserLoading } = useContext(UserContext);
	const location = useLocation();

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
								<Link to='/accounts'>Accounts</Link>
							</li>
							<li>
								Hello,{currentUser.name}
								<Link onClick={logoutHandler} to='/login'>
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
				<Route exact path='/accounts' element={<Accounts />} />
				<Route exact path='/accounts/new' element={<CreateAccount />} />
				<Route exact path='/accounts/edit/:id' element={<EditAccount />} />
			</Routes>
		</>
	);
}

export default App;
