<template>
  <section class="tabs-wrapper">
    <div>
      <span class="back" @click="onBack">Back</span>
      <h1 class="company-header">Company {{ this.company.name }}:</h1>
      <tabs v-model="selectedTab">
        <tab
          class="tab"
          v-for="(tab, i) in tabs"
          :key="`t${i}`"
          :val="tab"
          :label="tab"
          :indicator="true"
        />
      </tabs>

      <div v-if="selectedTab === 'Departments'">
        <departments-list
          :company="company"
          :companiesList="companiesList"
          @add-department="addDepartment"
          @delete-department="deleteDepartment"
        />
      </div>
      <div v-else>
        <employees-list
          :company="company"
          :companiesList="companiesList"
          :employeesList="employeesList"
          @add-employee="addEmployee"
          @delete-employees="deleteEmployee"
        />
      </div>
    </div>
  </section>

</template>

<script>
import DepartmentClass from '../../assets/DepartmentClass';
import DepartmentsList from '../Departments/DepartmentsList.vue';
import { Tabs, Tab } from 'vue3-tabs';
import EmployeesList from '../Employees/EmployeesList.vue';
import TabsService from '../../services/TabsService'


export default {
  components: {
    DepartmentsList,
    Tabs,
    Tab,
    EmployeesList,
  },
  emits: [],
  props: [],
  data() {
    return {
      selectedTab: 'Departments',
      tabs: ['Departments', 'Employees'],
      company: null,
      employeesList: [],
      tabsService: new TabsService(),
    };
  },
  created() {
    this.companiesList = JSON.parse(localStorage.getItem('companiesList'));
    const companyName = this.$route.params.name;
    this.company = this.tabsService.getCompanyByName(companyName.substring(1));
    this.employeesList = this.company?.departments?.reduce(
      (acc, department) => acc.concat(department?.employees),
      []
    );
  },
  methods: {
    //add employee to department and update list companies
    addEmployee(employee, departmentName) {
      this.tabsService.addEmployee(this.company.name, departmentName, employee);

      this.employeesList = this.company?.departments?.reduce(
        (acc, department) => acc.concat(department?.employees),
        []
      );
    },
    //delete employee from department and update list companies
    deleteEmployee(name, departmentName) {
       this.tabsService.deleteEmployee(this.company.name,departmentName,name);
       this.employeesList = this.company?.departments?.reduce(
        (acc, department) => acc.concat(department?.employees),
        []
      );
    },
    //add department to company and update list companies
    addDepartment(name, description) {
      const department = new DepartmentClass(name, description, []);
      this.tabsService.addDepartment(this.company.name , department);
    },
    //delete department from company and update list companies
    deleteDepartment(departmentToReplace , departmentName) {
      this.tabsService.deleteDepartment(this.company.name, departmentName, departmentToReplace);
      this.employeesList = this.company?.departments?.reduce(
        (acc, department) => acc.concat(department?.employees),
        []
      );
    },
    //route back to home page(companies list)
    onBack(){
       this.$router.push('/');
    }
  },
};
</script>

<style>
.tabs {
  padding: 10px 20px 20px 20px;
}
.tabs>.tab {
    position: relative;
  padding: 0.5rem 1.5rem;
  margin: 0 0.75rem 0.1rem 0;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  background-color: rgb(255 255 255 / 30%);
  backdrop-filter: blur(13px);
  z-index: 20;
}
.tabs>.tab:hover {
  cursor: pointer;
  background-color: rgb(255 255 255 / 80%);
  transform: scale(1.1);
  margin-top: -0.3rem;
  padding-top: 0.75rem;
  z-index: 30;
}
.back {
  cursor: pointer;
  position: relative;
  top: 10px;
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.back:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.back:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

.company-header {
  margin: 60px 0 7rem;
  font-family: Raleway, sans-serif;
  font-size: clamp(1.2rem, calc(1rem + 3.5vw), 3rem);
  line-height: 1.2;
  font-weight: 800;
  color: #222;
  position: relative;
}
.company-header::after {
    content: "";
    position: absolute;
    left: -2vmin;
    top: 50%;
    transform: translateY(-50%) rotate(9deg);
    width: 25vmin;
    height: 120%;
    background: #f2dae8;
    z-index: -1;
  }

 .company-header:last-of-type {
    margin-bottom: 20px;
  }

  .add-button {
  background-image: linear-gradient(#0dccea, #0d70ea);
  border: 0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .3) 0 5px 15px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: Montserrat,sans-serif;
  font-size: .9em;
  margin: 5px;
  padding: 10px 15px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.tabs-wrapper {
  background-color: #f7f0e6;
  opacity: 1;
  background-image: radial-gradient(#d2e3eb 0.8px, #f7f0e6 0.8px);
  background-size: 16px 16px;
}
</style>