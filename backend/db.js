const {MongoClient} = require("mongodb");

const state = {
	db: null
};

exports.connect = (url, callback) => {
	if (state.db) {
		done();
	}

	MongoClient.connect(url, {useNewUrlParser: true}, (err, database) => {
		if (err) {
			callback(err);
		}
		else {
			state.db = database.db("task4");
			callback();
		}
	});
};

exports.get = () => state.db;
