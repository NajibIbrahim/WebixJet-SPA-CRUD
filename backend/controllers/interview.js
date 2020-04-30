const Interview = require("../models/interview");

exports.all = (req, res) => {
	Interview.all((err, docs) => {
		if (!err) {
			docs.forEach((item) => {
				item.id = item._id;
				delete item._id;
			});
			res.status(200)
				.send(docs);
		}
		else {
			console.log(err);
			res.status(500)
				.send({status: "error"});
		}
	});
};

exports.findById = (req, res) => {
	Interview.findById(req.params.id, (err, doc) => {
		if (!err) {
			doc.id = doc._id;
			delete doc._id;
			res.status(200)
				.send(doc);
		}
		else {
			console.log(err);
			res.status(500)
				.send({status: "error"});
		}
	});
};

exports.create = (req, res) => {
	let interviews = {
		CompanyId: req.body.CompanyId,
		ContactId: req.body.ContactId,
		Date: req.body.Date
	};
	Interview.create(interviews, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500)
				.send({status: "error"});
		}
		else {
			interviews.id = interviews._id;
			delete interviews._id;
			res.status(200)
				.send(interviews);
		}
	});
};

exports.update = (req, res) => {
	Interview.update(req.params.id, {
		CompanyId: req.body.CompanyId,
		ContactId: req.body.ContactId,
		Date: req.body.Date
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
	Interview.delete(req.params.id, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			res.status(200).send();
		}
	});
};
