<template>
  <section class="company_form">
    <div class="company_form_template" v-if="showForm">
      <form  class="form_popup" @submit.prevent="addCompany">
        <label> Company Name: </label>
        <input type="text" v-model="name" />
        <br />
        <label> Adress: </label>
        <input type="text" v-model="address" />
        <br />
        <label> Email: </label>
        <input type="email" v-model="email" />
        <br />
        <label> Select an Image: </label>
        <input type="file" id="image" ref="imageInput" @change="getImage">
        <br />
        <button class="action_buttons" type="submit"> Add </button>
        <button class="action_buttons" @click="closeForm" > Close </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  
  components: {
  },
  props: ['showForm', 'companies'],
  data() {
    return {
      name: '',
      email:'',
      address:'',
      img: '',
    };
  },
  methods: {
    //add company to list
    addCompany() {
      //check if the name is unique
      if(this.companies.find(company => company.name === this.name)) {
        alert("Name "+ this.name + " already exist");
      }
      else if(this.name && this.email && this.address) {
        if(this.img === '') {
            this.img = "data:image/png;base64,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"
        }
        this.$emit('add-company' , this.name, this.address , this.email, this.img);
        this.resetForm();
      }
    },
    closeForm() {
        this.$emit('close-form');
        this.resetForm();
    },
    resetForm() { 
      this.name = '';
      this.email = '';
      this.address = '';
      this.img = '';
    },
    getImage() {
      const file = this.$refs.imageInput.files[0];
      this.uploadImage(file);
    },
    //convert file to base64 in fixed size 
    uploadImage(file) {
        const reader = new FileReader();
        reader.onload =(event) => {
            const dataURL = event.target.result;
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width =200;
                canvas.height = 200;
                canvas.getContext('2d').drawImage(image, 0 , 0, 200 , 200);
                const resizedDataUrl = canvas.toDataURL();
                this.img = resizedDataUrl;
            }
            image.src = dataURL;
        }
        reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.company_form_template {
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
.form_popup {
    background-color: #fff;
  border: 2px solid #74a2cf;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}
.action_buttons {
    cursor: pointer;
  height: 30px;
  padding: 0 25px;
  border: 2px solid #74a2cf;
  border-radius: 5px;
  background-color: #80b2e4;
  color: #fff;
}


</style>
