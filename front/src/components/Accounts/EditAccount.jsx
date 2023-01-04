import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData from '../../lib/fetchData';
import AccountForm from './NewAccount/AccountForm';

export default function EditAccount() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);
	const [oldAccount, setOldAccount] = useState({
		amount: 0,
		type: '',
		currency: '',
		name: '',
		description: '',
	});

	useEffect(() => {
		async function getAccount() {
			try {
				setIsLoading(true);
				const res = await fetchData(`/api/v1/accounts/detail/${id}`, 'GET', undefined);
				setOldAccount(res.account);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
		getAccount();
	}, [id]);

	function changeHandler(event) {
		const { name, value } = event.target;
		setOldAccount((prevAccount) => {
			return {
				...prevAccount,
				[name]: name === 'amount' ? parseInt(value) : value,
			};
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await fetchData(`/api/v1/accounts/edit/${id}`, 'POST', oldAccount);
		} catch (error) {
			console.log(error);
			alert(error);
		}
		setIsSubmited(true);
	}

	if (isLoading) return <h1>Loading...</h1>;
	if (isSubmited) {
		return <Navigate to='/' />;
	}
	return (
		<AccountForm
			oldAccount={oldAccount}
			onSubmit={submitHandler}
			onChange={changeHandler}
			title='Edit account'
		/>
	);
}
