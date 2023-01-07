import CompanyService from './CompanyService'

// singelton service
export default class TabsService {
    constructor() {
        this.companyService = CompanyService.instance;
        if(!this.companyService) {
          this.companyService = new CompanyService();
          this.companyService.getFromLocalStorage();
        }
    }

    getCompanyByName (name) { 
        return this.companyService.getCompanyByName(name);
    }

    getDeparmentsByCompanyName (name) { 
        return this.getCompanyByName(name).departments;
    }

    // find company by name and add department  
    addDepartment (companyName, department) {
        const company = this.companyService.getCompanyByName(companyName);
        company.departments.push(department);
        this.companyService.setCompany(company);
    }

    // find company by name and delete department  
    deleteDepartment(companyName, departmentName, departmentToReplace) {
        const company = this.companyService.getCompanyByName(companyName);

        // department to delete
        const updatedDepartment = company.departments.find(
            (department) => department.name === departmentName
          );
          
          //department to move all emloyees to 
          const replacedDepartment = company.departments.find(
            (department) => department.name === departmentToReplace
          );
          

          if(departmentToReplace && departmentToReplace !== '<None>'){
                //change to each employee the department to replacedDepartment
                updatedDepartment.employees = updatedDepartment.employees.map(employee => {
                return { ...employee, department: departmentToReplace } }
                );
                replacedDepartment.employees = replacedDepartment.employees.concat(updatedDepartment.employees);
                
                //update the department with new employees list
                company.departments = company.departments.map((department) =>
                department.name === departmentToReplace ? replacedDepartment : department
            );
          }
          // remove department from company
          company.departments = company.departments.filter(
            (department) => department.name !== departmentName
          );
    
          this.companyService.setCompany(company);
    }

    getDepartmentByNamePerCompany(companyName, departmentName){
      const company = this.companyService.getCompanyByName(companyName);
      return company.departments.find(
        (department) => department.name === departmentName
      );
    }

    // update department in company
    setDepartment(companyName,updatedDepartment) {
      const company = this.companyService.getCompanyByName(companyName);
      company.departments = company.departments.map((department) =>
        department.name === updatedDepartment.name ? updatedDepartment : department
      );
      this.companyService.setCompany(company);
    }

    addEmployee(companyName, departmentName, employee) {
      // find department in company by company name
      const updatedDepartment = this.getDepartmentByNamePerCompany(companyName, departmentName);
      
      updatedDepartment.employees.push(employee);
      this.setDepartment(companyName,updatedDepartment);
    }
    
    deleteEmployee(companyName, departmentName, employeeName) {
      // find department in company by company name
      const updatedDepartment = this.getDepartmentByNamePerCompany(companyName, departmentName);
      
      //remove employee from department
      updatedDepartment.employees = updatedDepartment.employees.filter(
        (employee) => employee.name !== employeeName
      );
      this.setDepartment(companyName,updatedDepartment);
    }

}