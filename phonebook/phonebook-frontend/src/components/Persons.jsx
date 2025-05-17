const Persons = ({ persons, filterString, handleDeletePerson }) => {
	return persons
		.filter(({ name }) =>
			name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
		)
		.map((person, idx) => (
			<p key={idx}>
				{person.name} {person.number}
				<button onClick={() => handleDeletePerson(person)}>
					delete
				</button>
			</p>
		));
};

export default Persons;
