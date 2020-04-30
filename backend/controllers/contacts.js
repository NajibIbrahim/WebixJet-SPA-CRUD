const Contacts = require("../models/contacts");

exports.all = (req, res) => {
	Contacts.all((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			docs.forEach((item) => {
				item.id = item._id;
				delete item._id;
			});
			res.status(200).send(docs);
		}
	});
};

exports.findById = (req, res) => {
	Contacts.findById(req.params.id, (err, doc) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			doc.id = doc._id;
			delete doc._id;
			res.status(200).send(doc);
		}
	});
};

exports.create = (req, res) => {
	let contact = {
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Address: req.body.Address,
		Company: req.body.Company,
		Skype: req.body.Skype,
		Phone: req.body.Phone,
		Email: req.body.Email,
		Photo: req.body.Photo,
		Birthday: req.body.Birthday
	};
	Contacts.create(contact, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			contact.id = contact._id;
			delete contact._id;
			res.status(200).send(contact);
		}
	});
};

exports.update = (req, res) => {
	Contacts.update(req.params.id, {
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Address: req.body.Address,
		Company: req.body.Company,
		Skype: req.body.Skype,
		Phone: req.body.Phone,
		Email: req.body.Email,
		Photo: req.body.Photo,
		Birthday: req.body.Birthday
	}, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			res.status(200).send();
		}
	});
};

exports.delete = (req, res) => {
	Contacts.delete(req.params.id, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			res.status(200).send();
		}
	});
};
