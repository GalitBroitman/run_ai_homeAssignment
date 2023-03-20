# run_ai_homeAssignment
Frontend Engineer - Code Assignment

Building a SPA system for managing departments and employees in different companies.

The system has 3 entities:
- Company
- Department
- Employee
In the header, you can select the company we are interested in seeing the information. Every company change is updating the information.

On sidenav, you can switch between 2 pages:

1. Departments:
- A table showing all the current company's departments.
- Adding a new department.
- Deleting an existing department.

Deleting a class has 2 modes:
1. The department has no employee association - in this case, the pop-up asking whether to delete is displayed.
2. The department has an employee association - in this case, a pop-up is displayed asking what to do with the employees associated with the department. Delete also the employees or transfer them to another department and only then show the popup for deleting the department.

2. Employees:
- A table showing all the employees in the current company.
- Adding a new employee and assigning him to an existing department.
- Deleting an existing employee.
