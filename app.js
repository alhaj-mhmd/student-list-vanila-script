//classes

//Student Class
class Student {
    constructor(name, grade, id) {
        this.name = name;
        this.grade = grade;
        this.id = id;

    }
}

//UI Class
class UI {
    static displayStudent() {
        const Students = Store.getStudents();
        Students.forEach((student) => UI.addStudentToList(student));
    }

    static addStudentToList(student) {
        const list = document.getElementById('student-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.grade}</td>
        <td>${student.id}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X<a/></td>
        `;
        list.appendChild(row);
    }

    static deleteStudent(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#grade').value = '';
        document.querySelector('#id').value = '';
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const col = document.querySelector('#student-col');
        const form = document.querySelector('#student-form');
        col.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Store Class

class Store {
    static getStudents() {
        let students;
        if (localStorage.getItem('students') === null) {
            students = [];
        } else {
            students = JSON.parse(localStorage.getItem('students'));
        }
        return students;
    }

    static addStudent(student) {
        const students = Store.getStudents();
        students.push(student);
        console.log(students);
        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(id) {
        const students = Store.getStudent();
        students.forEach((student, index) => {
            if (student.id === id) { students.splice(index, 1); }
        });
        localStorage.setItem('students', JSON.stringify(students));

    }
}


//Events

//Display Student 
document.addEventListener('DOMContentLoaded', UI.displayStudent);

//Add Student 
document.querySelector('#student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const grade = document.querySelector('#grade').value;
    const id = document.querySelector('#id').value;
    //validate
    if (name === '' || grade === '' || id === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
        const student = new Student(name, grade, id);
        UI.addStudentToList(student);
        Store.addStudent(student);
        UI.showAlert('Student Added', 'success');
        UI.clearFields();
    }
});


// Remove Student
document.querySelector('#student-list').addEventListener('click', (e) => {
    UI.deleteStudent(e.target);
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);
});