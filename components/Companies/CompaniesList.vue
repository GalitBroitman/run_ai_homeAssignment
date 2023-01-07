<template>
  <section class="company_List">
      <button class="add-button-company" @click="showForm = true">
          Add Company
      </button>
      <company-add-form
      :showForm="showForm"
      :companies="companyService.getAllCompanies()"
      @add-company="addCompany"
      @close-form="showForm = false"
      ></company-add-form>
      <div>
        <div class="list" v-if="!showForm">
          <Company
            v-for="company in companyService.getAllCompanies()"
            :key="company.name"
            :company="company"
            @delete-company="deleteCompany"
          />
        </div>
      </div>
  </section>
</template>

<script>
//component of contacts list with the data

import CompanyClass from '../../assets/CompanyClass';
import CompanyAddForm from './CompanyAddForm.vue'
import Company from './Company.vue'
import CompanyService from '../../services/CompanyService'

export default {
  components: {
    CompanyAddForm,
    Company
  },
  emits: [],
  props: [],
  data() {
    return {
      showForm: false,
      companyService: new CompanyService(),
    };
  },
  created() {
    //get existing companies from local storage
      this.companyService.getFromLocalStorage();
  },
  methods: {
    //create new company and add it to list
    addCompany(name, address, email, img) {
      const company = new CompanyClass(name, address , email, img, []);
      this.companyService.addCompany(company);
      this.showForm = false;
    },
    //delete company by name and update the list
    deleteCompany(name) {
      this.companyService.deleteCompany(name);
    }
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

.company_List {
  max-width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f7f0e6;
  opacity: 1;
  background-image:  linear-gradient(30deg, #3495c1 12%, transparent 12.5%, transparent 87%, #3495c1 87.5%, #3495c1), linear-gradient(150deg, #3495c1 12%, transparent 12.5%, transparent 87%, #3495c1 87.5%, #3495c1), linear-gradient(30deg, #3495c1 12%, transparent 12.5%, transparent 87%, #3495c1 87.5%, #3495c1), linear-gradient(150deg, #3495c1 12%, transparent 12.5%, transparent 87%, #3495c1 87.5%, #3495c1), linear-gradient(60deg, #3495c177 25%, transparent 25.5%, transparent 75%, #3495c177 75%, #3495c177), linear-gradient(60deg, #3495c177 25%, transparent 25.5%, transparent 75%, #3495c177 75%, #3495c177);
  background-size: 32px 56px;
  background-position: 0 0, 0 0, 16px 28px, 16px 28px, 0 0, 16px 28px;

}
.list {
  padding-right: 10px;
  padding-left: 10px;
}

.add-button-company {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.add-button-company:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.add-button-company:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.add-button-company:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
</style>