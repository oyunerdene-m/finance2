import { useParams } from 'react-router-dom';
import AccountForm from './NewAccount/AccountForm';

export default function EditAccount() {
	const { id } = useParams();

	return <AccountForm />;
}
