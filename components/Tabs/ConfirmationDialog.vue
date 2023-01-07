<template>
  <div class="confirm-dialog-template">
    <div class="confirm-dialog-body">
      <span class="confirm-dialog-close" @click="$emit('cancel')">🗙</span>
      <h2>{{ question }}</h2>
      <div v-if="showDepartments">
        <label class="confirm-dialog-department" > Department: </label>
        <select class="confirm-dialog-department-combo" v-model="department"> 
            <option class="confirm-dialog-department-option" v-for="departmentName in departmentNamesList" :key="departmentName">  
                {{departmentName}}
            </option>
        </select>

      </div>
      <br />
      <br />
      <div class="confirm-dialog-action">
        <button class="confirm-dialog-button" @click="onDelete">Delete</button>
        <button class="confirm-dialog-button" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {
  },
  emits: ["delete", "cancel"],
  props: {
    question: {
      required: true
    },
    departmentNamesList: {
      required: false
    },
    showDepartments: {
      required: false,
      default: false
    }
  },   
  data() {
    return {
        department: '',
    };
  },
  methods: {
      onDelete() {
        this.$emit('delete', this.department);
    }
  }
}

</script>

<style>
.confirm-dialog-template {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #cececeb5;
}
.confirm-dialog-body {
  background-color: #fff;
  border: 2px solid #74a2cf;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}
.confirm-dialog-action {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}
.confirm-dialog-department{
background-color: #fff;
    text-align: center;
    padding: 20px 40px;
    min-width: 250px;
    display: flex;
    font-weight: bold;
    flex-direction: column;
    font-size: 20px;
}
.confirm-dialog-button {
  cursor: pointer;
  height: 30px;
  padding: 0 25px;
  border: 2px solid #74a2cf;
  border-radius: 5px;
  background-color: #80b2e4;
  color: #fff;
}
.confirm-dialog-close {
  cursor: pointer;
  position: relative;
  align-self: end;
  right: -33px;
  top: -17px;
}

.confirm-dialog-department-combo {
      cursor: pointer;
    width: 340px;
    min-height: 25px;
    max-height: 300px;
    border-radius: 15px;
    background-color: rgb(250, 250, 250);
    box-shadow: 2px 4px 8px #c5c5c5;
    transition: all 300ms;
}

.confirm-dialog-department-option {
   width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    transition: all 300ms;
}
</style>
