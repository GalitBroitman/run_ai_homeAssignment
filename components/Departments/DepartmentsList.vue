<template>
     <section class="DepartmentsList">
      <button class="add-button" @click="showForm = true">
          Add Department
      </button>
        <department-add-form
          :showForm="showForm"
          :company="company"
          @add-department="addDepartment"
          @close-form="showForm = false"
        ></department-add-form>
        <div  class="table-content-table">
          <table class="table">
            <tr  class="table-tbody-tr">
              <th class="table-tbody-th" v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
            <tr  class="table-tbody-tr" v-for="row in company.departments" :key="row.name">
              <td v-for="column in columns" :key="column"> {{row[column]}}  </td>
              <td> <button @click="onDelete(row.name)">🗙</button> </td>
              <confirmation-dialog v-if="showConfirmDialog" 
                  :question="question"
                  :showDepartments="showDepartments"
                  :departmentNamesList="availableDepartments"
                  @delete="deleteDepartment" 
                  @cancel="onCancel">  
              </confirmation-dialog>
            </tr>
          </table>
        </div>
    </section>


</template>

<script>

import ConfirmationDialog from '../Tabs/ConfirmationDialog.vue'
import DepartmentAddForm from './DepartmentAddForm.vue'
export default {
  components: {
    DepartmentAddForm,
    ConfirmationDialog,
  },
  emits: [],
  props: ['company' , 'companiesList'],
  data() {
    return {
        showForm: false,
        columns: ['name', 'description'],
        showConfirmDialog: false,
        availableDepartments: [],
        showDepartments: false,
        departmentToDelete: '',
        question: 'Are you sure you want to delete?',
    };
  },
  methods: {
     addDepartment(name, description) {
      this.$emit('add-department' , name, description);
      this.showForm = false;
    },
    deleteDepartment(departmentToReplace) {
      this.$emit('delete-department' ,departmentToReplace, this.departmentToDelete);
      this.showConfirmDialog = false;
      this.departmentToDelete ='';
    },
    onDelete(name) {
      this.departmentToDelete = name;
      const departmentToDelete = this.company.departments.find(
        (department) => department.name === name
      );
         // on delete , check if there are employees in the department
      if(departmentToDelete.employees.length>1) {
          const departmentsNames = this.company.departments.map( department => department.name);
          
          //get list departments to move employees in
           this.availableDepartments = departmentsNames.filter(
              (departmentName) =>  departmentName !== name
            );
           this.availableDepartments =  this.availableDepartments.concat(['<None>']);
          this.showDepartments = true;
          this.question = "Are you sure you want to delete?\n Please select a department to transfer the employees in the current department to: ";
      }
      this.showConfirmDialog = true;
    },
    onCancel() {
      this.showConfirmDialog = false
    }
  },
};
</script>

<style>

table {
  border-collapse: unset !important;
  border-spacing: 0px 10px;
}

.table-content-table {
  margin: 20px;
  padding: 0px 10px;
  background: #F8F8F8;
  border: 1px solid #F1F1F1;
  border-radius: 5px;
}


.table-thead-tr th {
  color: #7D7D7D;
  font-weight: normal;
}

.table-tbody-tr td {
  background: #FFF; 
  border: 1px solid #FFF;
}

.table-tbody-tr td:first-child {
  border-radius: 5px 0 0 5px;
  padding: 10px;
  width: 130px;
}
.table-tbody-tr td:last-child {
  border-radius: 0 5px 5px 0;
  text-align: end;
  padding: 10px;
  width: 20px;
}
</style>
