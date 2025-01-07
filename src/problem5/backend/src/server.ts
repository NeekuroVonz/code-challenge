import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import cors from "cors";

const app: Application = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Database setup
let db: Database<sqlite3.Database, sqlite3.Statement>;

const initDB = async () => {
	db = await open({
		filename: "resources.db",
		driver: sqlite3.Database,
	});

	await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT
    );
`);
};

// CRUD Routes

// Create a resource
app.post("/resources", async (req: Request, res: Response) => {
	const { name, description } = req.body;
	try {
		const result = await db.run("INSERT INTO resources (name, description) VALUES (?, ?)", name, description);
		res.status(201).json({ id: result.lastID, name, description });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Get all resources
app.get("/resources", async (req: Request, res: Response) => {
	try {
		const resources = await db.all("SELECT * FROM resources");
		res.status(200).json(resources);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Get a single resource
app.get("/resources/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const resource = await db.get("SELECT * FROM resources WHERE id = ?", id);
		if (!resource) {
			res.status(404).json({ error: "Resource not found" });
			return;
		}
		res.status(200).json(resource);
		return;
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});

// Update a resource
app.put("/resources/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;
	try {
		const result = await db.run("UPDATE resources SET name = ?, description = ? WHERE id = ?", name, description, id);
		if (result.changes === 0) {
			res.status(404).json({ error: "Resource not found" });
			return;
		}
		res.status(200).json({ id, name, description });
		return;
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});

// Delete a resource
app.delete("/resources/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const result = await db.run("DELETE FROM resources WHERE id = ?", id);
		if (result.changes === 0) {
			res.status(404).json({ error: "Resource not found" });
			return;
		}
		res.status(200).json({ message: "Resource deleted successfully" });
		return;
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});

// Start the server
app.listen(port, async () => {
	await initDB(); // Initialize the database before starting the server
	console.log(`Server is running on http://localhost:${port}`);
});

