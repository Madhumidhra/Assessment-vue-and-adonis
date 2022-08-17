<template >
    <h1>Category</h1>
    <div>
        <table id = "customers"  >
        <tr>
          <th >EmployeeId</th>
          <th >EmployeeName</th>
        </tr>
      <tr v-for="(entry, i) in selectDepartmentData" :key="i">
         <td>{{ entry.id }}</td>
         <td>{{ entry.name }}</td>
         <!-- <td>{{ entry.dob}}</td>
         <td>{{ entry.doj }}</td>
         <td>{{ entry.email }}</td>
         <td>{{ entry.phone }}</td>
         <td>{{ entry.department_id }}</td> -->

        </tr>
    </table>
         <br>
       
        <button @click="orderDeptA()" >Ascending</button>
        <button @click="orderDeptD()" >Decending</button>
        <br>
    </div>
  </template>
 <script>
import axios from "axios";
export default {
 
  data(){
    return{
  instance:"",
    
    selectDepartmentData:null,
    
   
  }},
   mounted(){
      this.instance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {appkey :'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}
})


},
  methods:{
    orderDeptA(){
 this.instance.get('/assessmentEmployees/ascendingOrder').then((result) => {
      this.selectDepartmentData = result.data;
 })},
 orderDeptD(){
 this.instance.get('/assessmentEmployees/decendingOrder').then((result) => {
      this.selectDepartmentData = result.data;
 })}
     
    },
    clearForm() {
      this.id="";
      this.name = "";
    }
};

 
</script>
<style>
input[type=text], select {
  width: -100%;
  padding: 12px 20px;
  margin: 20px 0;
  display: inline-block;
  border: 1px solid rgb(120, 20, 20);
  border-radius: 10px;
  box-sizing: border-box;
}
 
input[type=submit] {
  width: -100%;
  background-color: #118b15;
 
  padding: 50px 30px;
  margin: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
 
/* input[type=submit]:hover {
  background-color: #45a049;
} */
 
div {
  border-radius: 5px;
  background-color: rgb(138, 133, 133);
  padding: 50px;
}
 
 
</style>
