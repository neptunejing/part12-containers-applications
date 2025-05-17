import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setFilterString] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleChangeName = (event) => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleChangeFilter = (event) => {
		setFilterString(event.target.value);
	};

	const handleDeletePerson = (deletePerson) => {
		if (window.confirm(`Delete ${deletePerson.name}`)) {
			personService.deleteById(deletePerson.id).then(() => {
				const changedPersons = persons.filter(
					(person) => person.id !== deletePerson.id
				);
				setPersons(changedPersons);
			});
		}
	};

	const addPerson = (event) => {
		event.preventDefault();
		const ifExists = persons.filter((person) => person.name === newName);
		if (
			ifExists.length > 0 &&
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			)
		) {
			const person = persons.find((person) => person.name === newName);
			personService
				.update({ ...person, number: newNumber })
				.then((updatedPerson) => {
					setPersons(
						persons.map((person) =>
							person.id !== updatedPerson.id
								? person
								: updatedPerson
						)
					);
					setNewName('');
					setNewNumber('');
				})
				.catch((errorMessage) => {
					console.log(errorMessage);
					setErrorMessage(errorMessage);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const changedPersons = [...persons, newPerson];
		personService
			.create(newPerson)
			.then(() => {
				setPersons(changedPersons);
				setNewName('');
				setNewNumber('');
				setSuccessMessage(`Added ${newName}`);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
			})
			.catch((errorMessage) => {
				console.log(errorMessage);
				setErrorMessage(errorMessage);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	// initialize
	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				message={successMessage || errorMessage}
				type={successMessage !== null ? 'success' : 'error'}
			/>
			<Filter
				filterString={filterString}
				handleChangeFilter={handleChangeFilter}
			/>
			<h3>Add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleChangeName={handleChangeName}
				newNumber={newNumber}
				handleChangeNumber={handleChangeNumber}
			/>

			<h3>Numbers</h3>
			<Persons
				persons={persons}
				filterString={filterString}
				handleDeletePerson={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
