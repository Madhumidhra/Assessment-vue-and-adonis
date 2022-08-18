<template >
    <h1>EMPLOYEE DETAILS</h1>
<br><br>
<div>
       <label>Choose a department</label>
         <select class="selectHtml"    v-model="filterDeptName" @click="filterEmployeesdName()">
         <option class="select" v-for="department in selectDepartmentData" :value="department.id" :key="department.name">
         {{ department.name}}
    </option>
  </select>
  <br><br>

    <button class="open-button" @click="openForm()"></button>
    <div   class="form-popup" id="myForm">
    <form @submit.prevent >

    <input type="number" placeholder="Enter your Employee Id " v-model="employeeId">
      <input type="text" placeholder="Enter your Employee Name " v-model="employeeName">
      <input type="date" placeholder="Enter your Employee Name " v-model="dob">
      <input type="date" placeholder="Enter your Employee Name " v-model="doj">
      <input type="text" placeholder="Enter your Employee Name " v-model="email">
      <input type="text" placeholder="Enter your Phone No"  minlength="10" v-model="phone">
      <label >departmentId:</label>
        <input v-model="departmentId" placeholder="Enter your department Id " >
        <br>
        <button v-if="updateButton" type="submit" class="btn" @click="insert()" >SUBMIT</button>
        <button v-else="updateButton" type="submit" @click="updateTable(updateIndex)" class="btn btn-dark" >Update </button>
        <button type="button" class="btn
         cancel" @click="closeForm()">Close</button>
        <br>
    </form>
    <br><br>
    </div>
    </div>
    <br><br>
     <table id = "customers"  >
        <tr>
          <th >Id</th>
          <th >Name</th>
          <th >dob</th>
          <th >doj</th>
          <th >email</th>
          <th >PhoneNumber</th>
          <th>DepartmentId</th>
         <th >createdAt</th>
         <th >updatedAt</th>
          <th >optionsDelete</th>
          <th >optionsEdit</th>
        </tr>
      <tr v-for="(entry, i) in selectEmployeeData" :key="i">
         <td>{{ entry.id }}</td>
         <td>{{ entry.name }}</td>
         <td>{{ entry.dob }}</td>
         <td>{{ entry.doj }}</td>
         <td>{{ entry.email }}</td>
         <td>{{ entry.phone }}</td>
         <td>{{ entry.department_id }}</td>
         <td>{{ entry.created_at }}</td>
         <td>{{ entry.updated_at }}</td>

         <td><button @click='deleteId(entry.id)' >Delete</button></td>
         
         <td><button @click='revertTable(i,entry.id)' >Edit</button></td>
        </tr>
    </table>
  </template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data(){
    return{
    instance:"",
    selectEmployeeData:null,
    employeeId:"",
    employeeName:"",
    phoneNum:"",
    departmentId:"",
    myForm:"",
    updateButton:true,
    selectDepartmentData : [],
    updateIndex:"",
    updateData:"",
    valid: true,
    success: false,
   
    message: null
  }},
    mounted(){
      this.instance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {appkey :'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}
})
 this.instance.get('/assessmentEmployees/selectEmployee').then((result) => {
      this.selectEmployeeData = result.data;
 })

  this.instance.get('/assessmentDepartments/selectDepartment').then((result) => {
      this.selectDepartmentData = result.data;
 })
 
 

},


methods:{
 

 async filterEmployeesdName(){
  
   const listData =  await this.instance.get("/assessmentEmployees/selectEmployee")
   this.selectEmployeeData = listData.data.filter(result =>
         {
             return  result.department_id == this.filterDeptName;
        })
    },
    reloadpage(){
       window.location.reload();
    },
select(){
   this.instance.get('/assessmentEmployees/selectEmployee').then((result) => {
      this.selectDepartmentData = result.data;
   })
},
revertTable(i,updateId){
      this.employeeId = this.selectEmployeeData[i].id
      this.employeeName = this.selectEmployeeData[i].name
      const dateOfBirth = moment.utc(this.selectEmployeeData[i].dob).format('YYYY-MM-DD')
      console.log(dateOfBirth)
      this.dob = dateOfBirth
      const dateOfJoining = moment.utc(this.selectEmployeeData[i].doj).format('YYYY-MM-DD')
      this.doj = dateOfJoining
     this.email = this.selectEmployeeData[i].email
      this.phone = this.selectEmployeeData[i].phone
      this.departmentId = this.selectEmployeeData[i].department_id
      this.openForm()
      //this.updateButton = false
      this.updateIndex = updateId
},
updateTable(updateIndex){
  this.updateData ={
    id : updateIndex,
    name:this.employeeName,
    dob:this.dob,
    doj:this.doj,
    email:this.email,
    phone:this.phone,
    department_id:this.departmentId,
      }
     // console.log(this.id)
   this.instance.patch("/assessmentEmployees/updateEmployee",this.updateData).then((result) => {
   this.data = result.data;
   this.updateButton = true
   this.clearForm()
   this.select()
   this.reloadpage()
    })
},
 deleteId(deleteEmployeeId){
    alert("are u sure want to delete")
    this.instance.delete("/assessmentEmployees/deleteEmployee" ,{ data: {id: deleteEmployeeId} }).then((result) => {
    const deleteData = result.data;
    //this.select()
    this.reloadpage()
    })
   
},
   

 openForm() {
  document.getElementById("myForm").style.display = "block";
},
 closeForm() {
  document.getElementById("myForm").style.display = "none";
},
  clearForm() {
      this.employeeId="";
      this.employeeName = "";
      this.dob="";
      this.doj="";
      this.email="";
      this.phone="";
      this.departmentId="";
      this.created_at="";
      this.updated_at=""
    },
}
}
</script>
<style>
.deptNameError{
color: red;
font-size: 20px;
font-family: 'Times New Roman', Times, serif;
}
.labelCss{
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  color:white;
}
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 50px;
}
  #customers {
    margin-top: 40px;
    margin-right: 1000px;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse:calc() ;
  /* width: 100%; */
}
#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
   font-size: 20px;
   text-align: center;
}
#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  text-align: left;
  background-color: #d2b92a;
  color: white;
}
input[type="text"],input[type="tel"],input[type="select"]
{
    font-size:15px;
    height: 60px;
    width: 400px;
  background-color: rgb(241, 233, 233);
  margin-top: 20px;
}
input[type="select"]{
margin-left: 80px;
}
h1{
margin-left: 100px;
font-weight: 300;
font-size: 30px;
font-family: serif;
color: rgba(244, 247, 244, 0.667);
}
.select{
 margin-left: 80px;
 width: 400px;
 height: 80px;
}
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  top: 23px;
  right: 28px;
  width: 280px;
}
/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  top: 0;
  right: 15px;
  border: 3px solid #F1F1F1;
  z-index: 9;
}
/* Add styles to the form container */
.form-container {
  max-width: 500px;
  padding: 10px;
  background-color: white;
}
/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #F1F1F1;
}
/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}
/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #991373;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}
/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}
/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
</style>
