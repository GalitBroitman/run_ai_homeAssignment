<template>
  <section class="department_form">
    <div>
      <form v-if="showForm" class="form_popup" @submit.prevent="addDepartment">
        <label> Department Name: </label>
        <input type="text" v-model="name" />
        <br />
        <label> Description: </label>
        <input type="text" v-model="description" />
        <br />
        <button type="submit"> Add </button>
        <button @click="closeForm" > Close </button>
      </form>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  props: ['showForm', 'company'],
  data() {
    return {
      name: '',
      description:'',
    };
  },
  methods: {
    //add department to company
    addDepartment() {
      //check that the departments name is unique
      if(this.company?.departments?.find(department => department.name === this.name)) {
        alert("Name "+ this.name + " already exist");
      }
      if(this.name) {
        this.$emit('add-department' , this.name, this.description);
        this.resetForm();
      }
    },
    closeForm() {
        this.$emit('close-form');
        this.resetForm();
    },
    resetForm() { 
      this.name = '';
      this.description ='';
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
