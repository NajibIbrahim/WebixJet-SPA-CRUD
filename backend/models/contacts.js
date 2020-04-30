const {ObjectID} = require("mongodb");
const db = require("../db");

exports.all = (callback) => {
	db.get().collection("contacts").find().toArray((err, docs) => {
		callback(err, docs);
	});
};

exports.findById = (id, callback) => {
	db.get().collection("contacts").findOne({_id: ObjectID(id)}, (err, doc) => {
		callback(err, doc);
	});
};

exports.create = (contact, callback) => {
	db.get().collection("contacts").insertOne(contact, (err, result) => {
		callback(err, result);
	});
};

exports.update = (id, newData, callback) => {
	db.get().collection("contacts").updateOne(
		{_id: ObjectID(id)},
		{
			$set: newData
		},
		(err, result) => {
			callback(err, result);
		}
	);
};

exports.delete = (id, callback) => {
	db.get().collection("contacts").deleteOne(
		{_id: ObjectID(id)},
		(err, result) => {
			callback(err, result);
		}
	);
};
