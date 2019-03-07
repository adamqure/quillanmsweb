const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('../public'));

let requests = [];
let id = 0;

app.get('/api/requests', (req, res) => {
	res.send(requests);
});

app.post('/api/requests', (req, res) => {
	id = id + 1;
	let request = {
		id: id,
		name: req.body.name,
		projectname: req.body.projectname,
		projectdescription: req.body.projectdescription,
		compensation: req.body.compensation
	};
	requests.push(request);
	res.send(request);
});

app.delete('/api/requests/:id', (req, res) => {
	let id = parseInt(req.params.id);
	let removeIndex = requests.map(request => {
			return request.id;
		})
		.indexOf(id);
	if (removeIndex === -1) {
		res.status(404)
			.send("Sorry, that request doesn't exist");
		return;
	}
	requests.splice(removeIndex, 1);
	res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));