require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');
const connectToDatabase = require("./models/index");
const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			Object.keys(req.body).length && JSON.stringify(req.body),
		].join(' ');
	})
);

let persons = [];

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		res.json(persons);
	});
});

const generateDate = () => {
	const date = new Date();
	const options = {
		weekday: 'short',
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'long',
	};
	return date.toLocaleString('en-US', options);
};

app.get('/info', (req, res) => {
	let cnt = persons.length;
	res.send(`Phonebook has info for ${cnt} people<p>${generateDate()}</p>`);
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then((res) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'name or number is missing',
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

const errorHandler = (error, req, res) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else {
		return res.status(400).send({ error: error.message });
	}
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = 3001;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
