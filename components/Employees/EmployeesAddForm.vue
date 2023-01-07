<template>
  <section class="employees_form">
    <div>
      <form v-if="showForm" class="form_popup" @submit.prevent="addEmployee">
        <label> Department: </label>
        <select v-model="department"> 
            <option v-for="departmentName in departmentNamesList" :key="departmentName">  
                {{departmentName}}
            </option>
        </select>
        <br />
        <label> Name: </label>
        <input type="text" v-model="name" />
        <br />
        <label> Address: </label>
        <input type="text" v-model="address" />
        <br />
        <label> Email: </label>
        <input type="email" v-model="email" />
        <br />
        <label> Phone: </label>
        <input type="text" v-model="phone" />
        <br />
        <label> Birth Date: </label>
        <input type="date" v-model="birthday" />
        <br />
        <label> Gender: </label>
        <label v-for="genderSelection in genderList" :key="genderSelection">
            <input type="radio" name="gender" :value="genderSelection" v-model="gender"> {{ genderSelection }}
        </label>
        <br />
        <button type="submit"> Add </button>
        <button @click="closeForm" > Close </button>
      </form>
    </div>
  </section>
</template>

<script>
import EmployeesClass from '../../assets/EmployeesClass'
export default {
  components: {
  },
  props: ['showForm', 'company', 'departmentNamesList'],
  data() {
    return {
        name: '',
        department: '',
        address: '',
        birthday: '',
        gender: '',
        email: '',
        phone: '',
        genderList: ['Male', 'Female'],
    };
  },
  methods: {
    closeForm() {
        this.$emit('close-form');
        this.resetForm();
    },
    resetForm() { 
      this.name = '';
      this.department = '';
      this.address = '';
      this.birthday = '';
      this.gender = '';
      this.email = '';
      this.phone = '';
    },
    addEmployee() {
      if(this.name && this.department) {
        const employee = new EmployeesClass(this.department,this.name, this.address, this.birthday, this.gender,this.email, this.phone);
        this.$emit('add-employee' , employee, this.department);
        this.resetForm();
      }
    },

  },
};
</script>

<style>
.form_popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
}

</style>
