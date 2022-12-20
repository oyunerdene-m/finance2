import { useState } from 'react';
import Form from './Form';
import fetchData from '../../lib/fetchData';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({ name: '', email: '', password: '' });

	function changeHandler(event) {
		const { name, value } = event.target;
		setUserData((prevData) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			const response = await fetchData('/api/v1/users/register', 'POST', userData);
			console.log('registered', response);
			navigate('/login');
		} catch (error) {
			console.log(error);
			alert(error);
		}
		setUserData({ name: '', email: '', password: '' });
	}

	return (
		<Form userData={userData} onChange={changeHandler} onSubmit={submitHandler} formType='signup' />
	);
}
