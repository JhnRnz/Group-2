import express from 'express';

let students = [
    { id: 0, name: "Gelen" },
    { id: 1, name: "Renzbert" },
    { id: 2, name: "Dustin Jioily" },
    { id: 3, name: "Clark" },
    { id: 4, name: "Darwin" }
];

const app = express();

app.use(express.json());

app.get("/students", (req, res) => {
    res.send(students);
});

app.post("/students", (req, res) => {
    const newStudent = req.body;

    students = [...students, newStudent];

    res.send(newStudent);
});

app.patch("/students/:name", (req, res) => {
    const name = req.params.name;
    const updatedStudentData = req.body;

    const studentIndex = students.findIndex(
        (student) => student.name === name
    );

    if (studentIndex === -1) {
        return res.status(404).send("Student not found");
    }

    students[studentIndex] = {
        ...students[studentIndex],
        ...updatedStudentData
    };

    res.send(students[studentIndex]);
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    students = students.filter((student) => student.id !== id);

    res.send(students);
});

app.listen(3000, () => {
    console.log("listening to port 3000");
});