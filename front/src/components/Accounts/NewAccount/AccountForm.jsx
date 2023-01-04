import { types, currency } from '../../../lib/accountsData';

export default function AccountForm({ onSubmit, onChange, title, oldAccount }) {
	return (
		<form onSubmit={onSubmit}>
			<h2>{title}</h2>
			<div>
				<label htmlFor='name'>Account name:</label>
				<input value={oldAccount.name} name='name' onChange={onChange} type='text' id='name' />
			</div>
			<div>
				<label htmlFor='type'> type:</label>
				<select value={oldAccount.type} onChange={onChange} name='type' id='type'>
					<option>--Choose type--</option>
					{types.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor='amount'>amount:</label>
				<input
					value={oldAccount.amount}
					name='amount'
					onChange={onChange}
					type='number'
					id='amount'
				/>
			</div>
			<div>
				<label htmlFor='currency'>currency:</label>
				<select value={oldAccount.currency} onChange={onChange} name='currency' id='currency'>
					<option>--Choose currency--</option>
					{currency.map((cur) => (
						<option key={cur} value={cur}>
							{cur}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor='description'>description:</label>
				<input
					value={oldAccount.description}
					name='description'
					onChange={onChange}
					type='text'
					id='description'
				/>
			</div>
			<button>Add</button>
		</form>
	);
}
