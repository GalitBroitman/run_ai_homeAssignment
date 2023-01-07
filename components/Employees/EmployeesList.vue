<template>
     <section class="EmployeesList">
      <button class="add-button" @click="addEmloyeeOnClick">
          Add Employee
      </button>
        <employees-add-form
          :showForm="showForm"
          :company="company"
          :departmentNamesList="departmentNamesList"
          @add-employee="addEmployeeToList"
          @close-form="showForm = false"
        ></employees-add-form>
        <div  class="table-content-table">
          <table class="table">
            <tr class="table-tbody-tr">
              <th class="table-tbody-th" v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
            <tr class="table-tbody-tr" v-for="row in employeesList" :key="row.name">
              <td v-for="column in columns" :key="column"> {{row[column]}}  </td>
              <td> <button @click="this.showConfirmDialog = true;">🗙</button> </td>
              <confirmation-dialog v-if="showConfirmDialog" 
                  question = 'Are you sure you want to delete?'
                  @delete="deleteEmployees(row.name, row.department)" 
                  @cancel="onCancel">  
              </confirmation-dialog>
            </tr>
          </table>
        </div>
    </section>


</template>

<script>


import EmployeesAddForm from './EmployeesAddForm.vue'
import ConfirmationDialog from '../Tabs/ConfirmationDialog.vue'
export default {
  components: {
    EmployeesAddForm,
    ConfirmationDialog
  },
  emits: [],
  props: ['company' , 'companiesList','employeesList'],
  data() {
    return {
        showForm: false,
        columns: ['department', 'name', 'address', 'birthday' , 'gender', 'email', 'phone' ,''],
        departmentNamesList: [],
        showConfirmDialog: false,

    };
  },
  methods: {
    addEmloyeeOnClick() {
        this.departmentNamesList = this.company.departments.map(department => department.name);
        this.showForm = true;
    },
     addEmployeeToList(employee, department) {
      this.$emit('add-employee' , employee, department);
      this.showForm = false;
    },
    deleteEmployees(name , department) {
      this.$emit('delete-employees' , name, department);
      this.showConfirmDialog = false;
    },
    onCancel() {
      this.showConfirmDialog = false
    }
  },
};
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #eee;
}
</style>
