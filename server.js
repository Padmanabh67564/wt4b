const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json()); // parses JSON request body
app.use(express.static("public")); // 👈 add this line

// ✅ Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to Local MongoDB"))
.catch(err => console.log("❌ DB Connection Error:", err));

// ✅ Use routes
app.use("/api/users", userRoutes);

// ✅ Start the server (keeps app running)
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




















/*ChatGPT said:

Excellent 👏 — this is one of the most common viva topics:

“Create four APIs using Node.js, Express.js, and MongoDB for CRUD operations.”

Below is your viva-ready Q&A set — short, simple, and with key syntax examples for each concept, so you can answer confidently.

🧠 Viva Questions on Node.js + Express.js + MongoDB CRUD APIs
⚙️ 1️⃣ What does CRUD mean?

Answer:
CRUD stands for Create, Read, Update, Delete — the four main operations for working with a database.

✅ Say:

“CRUD means adding, fetching, updating, and deleting data.”

✅ Syntax Example:

Operation	HTTP Method	API Endpoint Example
Create	POST	/api/users
Read	GET	/api/users
Update	PUT	/api/users/:id
Delete	DELETE	/api/users/:id
⚙️ 2️⃣ What are APIs?

Answer:
API stands for Application Programming Interface.
It allows communication between frontend and backend.

✅ Say:

“In my project, I created REST APIs using Express.js to connect the frontend with MongoDB.”

⚙️ 3️⃣ What is REST API?

Answer:
A REST API uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources.

✅ Say:

“I created RESTful APIs using Express to perform CRUD on user data.”

⚙️ 4️⃣ What is Express.js?

Answer:
Express.js is a web framework for Node.js used to create servers and APIs easily.

✅ Syntax Example:

const express = require('express');
const app = express();
app.use(express.json());


✅ Say:

“I used Express to handle routes for creating, reading, updating, and deleting data.”

⚙️ 5️⃣ What is MongoDB?

Answer:
MongoDB is a NoSQL database that stores data in JSON-like documents.

✅ Say:

“I used MongoDB to store and manage my user data.”

⚙️ 6️⃣ How did you connect Node.js to MongoDB?

Answer:
Using the Mongoose library.

✅ Syntax Example:

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


✅ Say:

“I connected MongoDB using Mongoose in my Node.js project.”

⚙️ 7️⃣ What is Mongoose?

Answer:
Mongoose is an ODM (Object Data Modeling) library for MongoDB — it helps define schemas and models.

✅ Syntax Example:

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);


✅ Say:

“I used Mongoose to define my User schema and interact with the database.”

⚙️ 8️⃣ What is a Schema and Model in Mongoose?

Answer:

Schema → defines the structure of documents (fields and types).

Model → connects the schema to a MongoDB collection.

✅ Example:

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Student = mongoose.model('Student', studentSchema);


✅ Say:

“Schema defines the data format; Model helps to access it in MongoDB.”

⚙️ 9️⃣ How do you create (POST) data using Express and MongoDB?

Answer:
Use the POST method and Mongoose’s save() function.

✅ Example:

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send('User Created');
});


✅ Say:

“I used a POST route to insert new user data into MongoDB.”

⚙️ 🔟 How do you read (GET) data from MongoDB?

Answer:
Use the GET method and find() function.

✅ Example:

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});


✅ Say:

“I used a GET route to fetch all users from MongoDB.”

⚙️ 11️⃣ How do you update (PUT) data in MongoDB?

Answer:
Use the PUT method and findByIdAndUpdate().

✅ Example:

app.put('/api/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send('User Updated');
});


✅ Say:

“I used PUT to update user details using the ID.”

⚙️ 12️⃣ How do you delete (DELETE) data from MongoDB?

Answer:
Use the DELETE method and findByIdAndDelete().

✅ Example:

app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('User Deleted');
});


✅ Say:

“I used DELETE route to remove user data from MongoDB.”

⚙️ 13️⃣ What does express.json() do?

Answer:
It lets Express parse incoming JSON data from requests.

✅ Example:

app.use(express.json());


✅ Say:

“It allows my server to understand JSON data sent by the client.”

⚙️ 14️⃣ What is req.body?

Answer:
It stores data sent from the client (like form data or JSON).

✅ Example:

console.log(req.body.name);


✅ Say:

“req.body contains the data sent in a POST or PUT request.”

⚙️ 15️⃣ What is req.params?

Answer:
It contains route parameters (like id in /api/users/:id).

✅ Example:

app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id);
});


✅ Say:

“It is used to access URL parameters, like user ID.”

⚙️ 16️⃣ What is the role of app.listen()?

Answer:
It starts the server and listens for incoming requests on a port.

✅ Example:

app.listen(3000, () => console.log('Server running'));


✅ Say:

“It runs my server and listens on port 3000.”

⚙️ 17️⃣ What is the default port used in your project?

Answer:
Port 3000.

✅ Say:

“My server runs on port 3000.”

⚙️ 18️⃣ What tools did you use to test APIs?

Answer:
I used Postman to send requests and test my API responses.

✅ Say:

“I tested my CRUD APIs using Postman.”

⚙️ 19️⃣ How do you handle errors in Node.js?

Answer:
Use try-catch blocks or Express error-handling middleware.

✅ Example:

try {
  const user = await User.findById(id);
} catch (error) {
  res.status(500).send('Error Occurred');
}


✅ Say:

“I used try-catch to handle database or server errors.”

⚙️ 20️⃣ Explain your project structure.

Answer:

project/
│
├── server.js          → main server file
├── models/user.js     → schema & model
├── routes/userRoute.js → CRUD APIs
├── node_modules/      → dependencies
└── package.json       → project info


✅ Say:

“My project has separate files for server setup, schema, and routes.”

⚙️ 21️⃣ Why do we use await and async in Node.js?

Answer:
They are used for handling asynchronous operations like database queries.

✅ Example:

app.get('/api/users', async (req, res) => {
  const users = await User.find();
});


✅ Say:

“I used async and await for database operations so my code runs smoothly.”

⚙️ 22️⃣ What are advantages of Node.js and MongoDB combination?

Answer:

Both use JavaScript, so easier integration

Fast performance

Scalable and non-blocking architecture

JSON data works directly with MongoDB

✅ Say:

“Node.js and MongoDB work well together because both handle JSON data.”

⚙️ 23️⃣ What is package.json used for?

Answer:
It stores project info like name, version, and dependencies.

✅ Example:

{
  "name": "crud-api",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  }
}


✅ Say:

“package.json keeps track of all the dependencies I installed.”

⚙️ 24️⃣ What command is used to start the project?

Answer:

node server.js


or (for auto restart)

nodemon server.js


✅ Say:

“I used nodemon to automatically restart the server after changes.”

⚙️ 25️⃣ What is the flow of your CRUD API project?

Answer:

Frontend / Postman sends request

Express receives the request

Mongoose interacts with MongoDB

Response sent back to client

✅ Say:

“Request → Express → MongoDB → Response.”

💬 Sample Viva Summary You Can Say:

“In this project, I created four REST APIs using Node.js, Express.js, and MongoDB.
I used Express for routing and Mongoose to connect to MongoDB.
The four APIs perform Create, Read, Update, and Delete operations.
I tested all endpoints using Postman on port 3000.”*/
