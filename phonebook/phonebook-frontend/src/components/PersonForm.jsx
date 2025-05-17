const PersonForm = (props) => {
	const { addPerson } = props;
	const { newName, handleChangeName } = props;
	const { newNumber, handleChangeNumber } = props;

	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={handleChangeName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleChangeNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
