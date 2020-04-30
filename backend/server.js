const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./db");
const contactsController = require("./controllers/contacts");
const companiesController = require("./controllers/companies");
const interviewController = require("./controllers/interview");
const filesController = require("./controllers/files");

const app = express();
const port = 3012;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static(__dirname + "/static"));
app.use(fileUpload());

app.get("/", (req, res) => {
	res.send("API for test project");
});

app.get("/contacts", contactsController.all);
app.get("/contacts/:id", contactsController.findById);
app.post("/contacts", contactsController.create);
app.put("/contacts/:id", contactsController.update);
app.delete("/contacts/:id", contactsController.delete);

app.get("/companies", companiesController.all);
app.get("/companies/:id", companiesController.findById);
app.post("/companies", companiesController.create);
app.put("/companies/:id", companiesController.update);
app.delete("/companies/:id", companiesController.delete);

app.get("/interview", interviewController.all);
app.get("/interview/:id", interviewController.findById);
app.post("/interview", interviewController.create);
app.put("/interview/:id", interviewController.update);
app.delete("/interview/:id", interviewController.delete);

app.get("/upload", filesController.all);
app.post("/upload", filesController.upload);
app.post("/uploadAll/:id", filesController.uploadAll);

db.connect("mongodb://localhost:27017/task4", (err) => {
	if (err) {
		console.log(err);
	}
	else {
		app.listen(port, () => {
			console.log(`API app started http://localhost:${port}`);
		});
	}
});
