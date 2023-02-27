$(document).ready(onReady);

let employeeList = [];
let averageSalary = 0;

function onReady() {
    // add an employee on submit
    $('#submit-button').on('click', addEmployee);

    // delete an employee
    $('#employee-table-body').on('click', '.delete-button', removeEmployee);
}

function addEmployee() {
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const id = $('#employee-id').val();
    const title = $('#title').val();
    const salary = Number($('#annual-salary').val());

    const newEmployee = {
        firstName,
        lastName,
        id,
        title,
        salary
    };

    employeeList.push(newEmployee);

    clearInputs();

    render();
}

function clearInputs() {
    $('#first-name').val('');
    $('#last-name').val('');
    $('#employee-id').val('');
    $('#title').val('');
    $('#annual-salary').val('');
}

function removeEmployee() {
    // NOTE: Base level is to just remove the employee from the DOM: Demo that first

    const employeeIdToRemove = $(this).parent().siblings().eq(2).text();

    const newEmployeeList = [];

    for (employee of employeeList) {
        if (employee.id !== employeeIdToRemove) {
            newEmployeeList.push(employee);
        }
    }

    employeeList = newEmployeeList;

    render();
}

function calculateMonthlyCost() {
    let annualCost = 0;
    for (employee of employeeList) {
        annualCost += employee.salary;
    }

    const monthlyCost = (annualCost/12).toFixed(2);

    return monthlyCost;
}


function render() {
    $('#employee-table-body').empty();

    const deleteButton = '<button class="delete-button">Delete</button>';

    for (employee of employeeList) {
        // Note: Students may wonder about how to format the salary to $
        // The best option is probably creating a formatter with new Intl.NumberFormat()
        // But that will be hard for students to understand right now
        $('#employee-table-body').append(`
        <tr>
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.id}</td>
          <td>${employee.title}</td>
          <td>${employee.salary}</td>
          <td>${deleteButton}</td>
        </tr>
     `);
    }

    const monthlyCost = calculateMonthlyCost();

    $('#monthly-cost').append(monthlyCost);
}