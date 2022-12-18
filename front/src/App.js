import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AnotherPage from './pages/another';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/another' element={<AnotherPage />} />
		</Routes>
	);
}

export default App;
