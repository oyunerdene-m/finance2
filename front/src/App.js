import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AnotherPage from './pages/another';
import Signup from './components/User/Signup';
import Login from './components/User/Login';

function App() {
	return (
		<Routes>
			<Route path='/signup' element={<Signup />} />
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<Home />} />
			<Route path='/another' element={<AnotherPage />} />
		</Routes>
	);
}

export default App;
