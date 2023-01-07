
export default class CompanyService {
    constructor() {
        if(CompanyService.instance) {
            return CompanyService.instance;
        }
        CompanyService.instance = this;
        this.companiesList = [];
    }

    //return companies from local storage
    getAllCompanies () { 
        return this.companiesList;
    }

    getCompanyByName (name) { 
        return this.companiesList.find(company => company.name === name);
    }

    // add company to list and update local storage
    addCompany (company) {
        this.companiesList.push(company);
        this.setToLocalStorage();
    }
    
    // delete company from list and update local storage
    deleteCompany(name) {
        this.companiesList = this.companiesList.filter(
            (company) => company.name !== name
        );
        this.setToLocalStorage();
    }

    // update company in list and update local storage
    setCompany(company) {
        this.companiesList = this.companiesList.map((currCompany) =>
            company.name === currCompany.name ? company : currCompany
      );
      this.setToLocalStorage();
    }

    getFromLocalStorage() {
        this.companiesList = JSON.parse(localStorage.getItem('companiesList'));
    }

    setToLocalStorage() {
        localStorage.setItem('companiesList', JSON.stringify(this.companiesList));

    }

}