require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Client } = require("pg");


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const router = express.Router();


// Database connection
const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "newpassword",
  port: 5432,
});
db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("38");
    
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.query("SELECT * FROM users WHERE id = $1", [decoded.id]);

    if (user.rows.length === 0) {
      throw new Error();
    }

    req.user = user.rows[0];
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};

// User Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, title, location } = req.body;

    // Check if user already exists
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await db.query(
      "INSERT INTO users (name, email, password, title, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, title || "", location || ""]
    );

    // Create token
    const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: user.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Discover Profiles
app.get("/api/profiles/discover", auth, async (req, res) => {
  try {
    // Get users that the current user hasn't swiped on yet
    const swipedUsers = await db.query("SELECT target_id FROM swipes WHERE user_id = $1", [req.user.id]);
    const swipedUserIds = swipedUsers.rows.map((swipe) => swipe.target_id);
    swipedUserIds.push(req.user.id);

    const users = await db.query("SELECT id, name, title, location, bio, image FROM users WHERE id <> ALL ($1) LIMIT 10", [
      swipedUserIds,
    ]);

    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Swipe Profile
app.post("/api/profiles/swipe", auth, async (req, res) => {
  try {
    const { profileId, direction } = req.body;

    // Create swipe
    await db.query("INSERT INTO swipes (user_id, target_id, direction) VALUES ($1, $2, $3)", [
      req.user.id,
      profileId,
      direction,
    ]);

    // Check if it's a match
    if (direction === "right") {
      const otherUserSwipe = await db.query(
        "SELECT * FROM swipes WHERE user_id = $1 AND target_id = $2 AND direction = 'right'",
        [profileId, req.user.id]
      );

      if (otherUserSwipe.rows.length > 0) {
        await db.query("INSERT INTO matches (user1_id, user2_id) VALUES ($1, $2)", [req.user.id, profileId]);
        return res.json({ match: true });
      }
    }

    res.json({ match: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch User Profile

app.get("/api/profile", auth, async (req, res) => { 
  try {
    // Fetch user details from the database using req.user.id (from auth middleware)
    const user = await db.query("SELECT id, name, email, title, location, skills, bio, image FROM users WHERE id = $1", [req.user.id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data as JSON
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to Upload Profile Image
router.post("/api/profile/image", auth, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Update user profile image in the database
    await db.query("UPDATE users SET image = $1 WHERE id = $2", [imageUrl, req.user.id]);

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while uploading image" });
  }
});

module.exports = router;


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});