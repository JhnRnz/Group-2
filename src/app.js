import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.json());

app.get("/students", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM students ORDER BY id"
        );

        res.send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

app.post("/students", async (req, res) => {
    try {
        const { id, name } = req.body;

        const result = await pool.query(
            "INSERT INTO students (id, name) VALUES ($1, $2) RETURNING *",
            [id, name]
        );

        res.status(201).send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

app.patch("/students/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const { id, name: newName } = req.body;

        const result = await pool.query(
            `UPDATE students
             SET id = COALESCE($1, id),
                 name = COALESCE($2, name)
             WHERE name = $3
             RETURNING *`,
            [id, newName, name]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Student not found");
        }

        res.send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});


app.delete("/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "DELETE FROM students WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Student not found");
        }

        res.send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

export default app;