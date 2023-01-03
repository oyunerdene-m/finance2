import { useParams } from 'react-router-dom';
import AccountForm from './NewAccount/AccountForm';

export default function EditAccount() {
	const { id } = useParams();

	function changeHandler() {}

	function submitHandler() {}

	return <AccountForm onSubmit={submitHandler} onChange={changeHandler} title='Edit account' />;
}
