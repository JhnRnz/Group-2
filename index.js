import express from 'express';

    let students = [{id: 0, name: "student0"}];

const app = express();

app.use(express.json());


app.get("/students", (req, res) => {
    res.send(students);
});
 
app.post("/students", (req, res) => {
    const newStudent = req.body;

    students =  [...students, newSrtudents];

    res.send(newStudent);
});

app.patch("/students/:name", (req, res) =>{
   
    //"To be implemented"

    //const id = req.params;
    //const updatedStudentData = req.body;
  
    const updatedStudents = students.filter ((student) => studentId != id);

    res.send(students[studentIndex]);

});

app.delete("/students/:id", (req, res) =>{
   
    //"To be implemented"

});

app.listen(3000, () => {
    console.log("listening to port 3000");

});
   


