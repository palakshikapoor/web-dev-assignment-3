import { useState } from "react";
import studentsData from "./data";

function App() {
  const [students, setStudents] = useState(studentsData);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  function addStudent(e) {
    e.preventDefault();

    if (name === "" || marks === "") {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: name,
      marks: Number(marks),
    };

    setStudents([...students, newStudent]);
    setName("");
    setMarks("");
  }

  function updateMarks(id, value) {
    const updated = students.map((student) =>
      student.id === id
        ? { ...student, marks: Number(value) }
        : student
    );

    setStudents(updated);
  }

  let total = 0;
  let passed = 0;
  let failed = 0;

  students.forEach((student) => {
    total += student.marks;

    if (student.marks >= 40) {
      passed++;
    } else {
      failed++;
    }
  });

  const average =
    students.length > 0
      ? (total / students.length).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          🎓 Student Report Card
        </h1>

        {/* Form */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6">
          <form
            onSubmit={addStudent}
            className="grid md:grid-cols-3 gap-3"
          >
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Enter Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="border p-2 rounded-lg"
            />

            <button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add Student
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6 overflow-x-auto">
          <table className="w-full text-center">

            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Marks</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const pass = student.marks >= 40;

                return (
                  <tr key={student.id} className="border-b">

                    <td className="p-3">{student.name}</td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={student.marks}
                        onChange={(e) =>
                          updateMarks(student.id, e.target.value)
                        }
                        className="border w-20 text-center rounded p-1"
                      />
                    </td>

                    <td className="p-3">
                      <span
                        className={
                          pass
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {pass ? "Pass" : "Fail"}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="font-bold">Total</h3>
            <p>{total}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="font-bold">Average</h3>
            <p>{average}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center text-green-600">
            <h3 className="font-bold">Passed</h3>
            <p>{passed}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center text-red-600">
            <h3 className="font-bold">Failed</h3>
            <p>{failed}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;