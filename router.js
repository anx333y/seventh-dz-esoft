const express = require('express');
const fs = require('fs');
const fileName = 'users.json';

const router = express.Router();

const getFileData = (fileName) => {
	try {
		const data = fs.readFileSync(fileName);
		const users = JSON.parse(data);

		return users;
	} catch(err) {
		console.log(err);
	}
};

const pushFileData = (fileName, content) => {
	try {
		const data = fs.writeFileSync(fileName, content);
	} catch (err) {
		console.error(err);
	}
};



router.route('/users')
	.get((req, res) => {
		const users = getFileData(fileName);

		res.json(users);
	})
	.post((req, res) => {
		const {name, email, age} = req.body;

		if (!name || !email || !age) {
			res.status(400).send('Неполные данные')
			return;
		}

		const users = getFileData(fileName);

		users.push({id: Date.now(), name, email, age});

		pushFileData(fileName, JSON.stringify(users));

		res.json(users);
	})

router.route('/users/sorted')
	.get((req, res) => {
		const users = getFileData(fileName);

		users.sort((a, b) => a.name > b.name ? 1 : -1);

		res.json(users);
	})

router.route('/users/:id')
	.get((req, res) => {
		const id = req.params.id;
		const users = getFileData(fileName);
		const user = users.find(user => user.id == id);
		
		res.json(user);
	})
	.put((req, res) => {
		const id = req.params.id;
		const {name, email, age} = req.body;

		if (!name || !email || !age) {
			res.status(400).send('Неполные данные')
			return;
		}

		const users = getFileData(fileName);
		const user = users.find(user => user.id == id);
		const userIndex = users.findIndex(user => user.id == id);

		if (!user) {
			res.status(400).send('Пользователя с таким id не найдено');
			return;
		}
		
		user.name = name;
		user.email = email;
		user.age = age;

		users[userIndex] = user;


		pushFileData(fileName, JSON.stringify(users));

		res.json(users);
	})
	.delete((req, res) => {
		const id = req.params.id;

		const users = getFileData(fileName);
		const userIndex = users.findIndex(user => user.id == id);

		if (!users[userIndex]) {
			res.status(400).send('Пользователя с таким id не найдено');
			return;
		}

		users.splice(id - 1, 1);
		
		pushFileData(fileName, JSON.stringify(users));

		res.json(users)
	})

router.route('/users/age/:age')
	.get((req, res) => {
		const age = req.params.age;

		const users = getFileData(fileName);

		const olderUsers = users.filter(user => user.age > parseInt(age));

		res.json(olderUsers);
	})

router.route('/users/domain/:domain')
	.get((req, res) => {
		const domain = req.params.domain;

		const users = getFileData(fileName);

		const withDomainUsers = users.filter(user => user.email.includes(`@${domain}`));

		res.json(withDomainUsers);
	})



module.exports = router;