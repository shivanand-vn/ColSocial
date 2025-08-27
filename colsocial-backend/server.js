const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Importing models
const User = require("./models/User");
const Event = require("./models/Event");
const Forum = require("./models/Forum");
const Resource = require("./models/Resource");

const app = express();
const PORT = 5000;
const SECRET_KEY = "process.env"; 


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/colsocial")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// AUTH ROUTES 

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// EVENTS ROUTES

// Get all events
app.get("/events", authMiddleware, async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Add event
app.post("/events", authMiddleware, async (req, res) => {
  const { title, date } = req.body;

  
  const username = req.user.email.split("@")[0];

  const newEvent = new Event({
    title,
    date,
    creatorId: req.user.id,
    creatorName: username
  });

  await newEvent.save();
  res.status(201).json(newEvent);
});


// Delete event (only by creator)
app.delete("/events/:id", authMiddleware, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  if (event.creatorId.toString() !== req.user.id) {
    return res.status(403).json({ error: "You can only delete your own events" });
  }

  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

//FORUM ROUTES

// Get all forums
app.get("/forums", async (req, res) => {
  try {
    const forums = await Forum.find().sort({ createdAt: -1 });
    res.json(forums);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forums" });
  }
});


// Add forum
app.post("/forums", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const username = req.user.email.split("@")[0]; 

    const newForum = new Forum({
      title,
      description,
      creatorId: req.user.id,
      creatorName: username,
      replies: []
    });

    await newForum.save();
    res.status(201).json(newForum);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating forum" });
  }
});


// Delete forum (only by creator)
app.delete("/forums/:id", authMiddleware, async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  if (!forum) return res.status(404).json({ error: "Forum not found" });

  if (forum.creatorId.toString() !== req.user.id) {
    return res.status(403).json({ error: "You can only delete your own forums" });
  }

  await Forum.findByIdAndDelete(req.params.id);
  res.json({ message: "Forum deleted" });
});

//RESOURCES ROUTES

app.get("/resources", authMiddleware, async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

// Add Resource
app.post("/resources", authMiddleware, async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).json({ error: "Title and link are required" });
    }

    const username = req.user.email.split("@")[0]; 

    const newResource = new Resource({
      title,
      link,
      creatorId: req.user.id,
      creatorName: username,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ error: "Server error while adding resource" });
  }
});


// Delete Resource 
app.delete("/resources/:id", authMiddleware, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    if (resource.creatorId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete" });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
