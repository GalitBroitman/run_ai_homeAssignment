<template>
  <section class="company-details">
     <button class="company">
         <div style="position: relative; ">
            <div id="delete" class="delete-company" @click="showConfirmDialog = true"></div>
            <confirmation-dialog v-if="showConfirmDialog" 
                  question = 'Are you sure you want to delete?'
                  @delete="onDelete" 
                  @cancel="onCancel">  
            </confirmation-dialog>
            <div>
                <img
                    class="company-image"
                    v-if="company.img"
                    :src="company.img"
                />
            </div>
            <li class="list">
                <h2 class="title">
                    Company Name : 
                     <span class="info"> {{ company.name }}  </span>
                </h2>
                <h2 class="title">
                    Company Address:
                    <span  class="info"> {{ company.address }} </span>
                </h2>
                <h2 class="title">
                    Company Email:
                     <span class="info"> {{ company.email }} </span>
                </h2>
            </li>
         </div>
         <button class="open-company" @click="enterToCompany"> Open </button>
     </button>
  </section>
</template>

<script>
import ConfirmationDialog from '../Tabs/ConfirmationDialog.vue'

export default {
  components: { ConfirmationDialog },
  data() {
    return {
      showConfirmDialog: false,
    };
  },
  methods: {
    //cancel from confirmation dialog
    onCancel() {
      this.showConfirmDialog = false
    },
    //route to company departments and employees lists page
    enterToCompany() {
      this.$router.push('/tabsWrapper/:'+ this.company.name);
    },
    // delete company from list
    onDelete() {
      this.$emit('delete-company' , this.company.name);
      this.showConfirmDialog = false;        
    }
  },
  props: ['company'],
};
</script>

<style>

.company {
  margin: 2rem auto;
  max-width: 35rem;
  min-width: 35rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background: beige;
}
.open-company {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.open-company:hover {
  background-color: #fff;
}

.open-company:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .open-company {
    min-width: 120px;
    padding: 0 25px;
  }
}


.company-details {
    display: inline;
    padding: 6px;
}

.company-image {
  border-radius: 50%;
}

.info{ 
    color: chocolate;
    font-size: 20px;
    font-style: italic;
}
.title {
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
}

.delete-company {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 24px;
	height: 24px;
	opacity: 0.2;
	cursor: pointer;
  transition: opacity ease 0.5s;
}
.delete-company:hover {
		opacity: 1;
	}


.delete-company::before,
.delete-company::after {
	content: '';
	position: absolute;
	top: 10px;
	display: block;
	width: 24px;
	height: 3px;
	background: #000;
}

.delete-company::before {
	transform: rotate(45deg);
}

.delete-company::after {
	transform: rotate(-45deg);
}
</style>
