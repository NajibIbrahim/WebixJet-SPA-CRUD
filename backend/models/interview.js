const {ObjectID} = require("mongodb");
const db = require("../db");

exports.all = (callback) => {
	db.get().collection("interview").find().toArray((err, docs) => {
		callback(err, docs);
	});
};

exports.findById = (id, callback) => {
	db.get().collection("interview").findOne({_id: ObjectID(id)}, (err, doc) => {
		callback(err, doc);
	});
};

exports.create = (interviews, callback) => {
	db.get().collection("interview").insertOne(interviews, (err, result) => {
		callback(err, result);
	});
};

exports.update = (id, newData, callback) => {
	db.get().collection("interview").updateOne(
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
	db.get().collection("interview").deleteOne(
		{_id: ObjectID(id)},
		(err, result) => {
			callback(err, result);
		}
	);
};
