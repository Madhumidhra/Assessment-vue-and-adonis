<template >
    <h1>DEPARTMENT DETAILS</h1>
    <button class="open-button" @click="openForm()" ></button>
    <div   class="form-popup" id="myForm">
    <form @submit.prevent >
        <input type="text" placeholder="Enter the department id " v-model="departmentId" >
        <input type="text" placeholder="Enter the department name " v-model="departmentName" >
       
         <!-- <div class="deptNameError">{{ errors.departmentName }}</div> -->
        <br>
        <button v-if="updateButton==true" type="submit" class="btn" @click="insert()" >SUBMIT</button><br><br>
        <button v-if="updateButton==false" type="submit" @click="updateTable(updateIndex)" class="btn btn-dark" >Update </button>
        <button type="button" class="btn cancel" @click="closeForm()">Close</button>
        <br>
    </form>
    <br><br>
    </div>
    <br><br>
     <table id = "customers"  >
        <tr>
          <th >departmentId</th>
          <th >departmentName</th>
          <th >createdAt</th>
           <th >updatedAt</th>
          <th >optionsDelete</th>
          <th >optionsEdit</th>
        </tr>
      <tr v-for="(entry, i) in selectDepartmentData" :key="i">
         <td>{{ entry.id }}</td>
         <td>{{ entry.name }}</td>
         <td>{{ entry.created_at }}</td>
         <td>{{ entry.updated_at }}</td>

         <td><button @click='deleteId(entry.id)' >Delete</button></td>
         
         <td><button @click='revertTable(i,entry.id)' >Edit</button></td>
        </tr>
    </table>
  </template>
<script>
import axios from "axios";
export default {
  data(){
    return{
  instance:"",
    selectStaffData:[],
    selectDepartmentData:null,
    deleteStaffId:null,
    insertData:"",
    departmentName:"",
    myForm:"",
    updateButton:true,
    updateIndex:"",
    updateData:"",
    valid: true,
    success: false,
    errors: {},
    message: null
  }},
    mounted(){
      this.instance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {appkey :'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}
})
 this.instance.get('/assessmentDepartments/selectDepartment').then((result) => {
      this.selectDepartmentData = result.data;
 })
},
methods:{
select(){
   this.instance.get('/assessmentDepartments/selectDepartment').then((result) => {
      this.selectDepartmentData = result.data;
   })
},
revertTable(i,updateId){
      this.departmentName = this.selectDepartmentData[i].name
      this.departmentId = this.selectDepartmentData[i].id
      this.openForm()
      this.updateButton = false
      this.updateIndex = updateId
},
updateTable(updateIndex){
  this.updateData ={
    id : updateIndex,
    name:this.departmentName
      }
     // console.log(this.id)
   this.instance.patch("/assessmentDepartments/updateDepartment", this.updateData).then((result) => {
   this.data = result.data;
   this.updateButton = true
   this.clearForm()
   this.select()
    })
},
deleteId(deleteDepartmentId){
    this.instance.delete("/assessmentDepartments/deleteDepartment" ,{ data: { id: deleteDepartmentId} }).then((result) => {
      const deleteData = result.data;
     alert("are u sure want to delete")
      this.select()
    })
},
   
//    insert() {
//       //this.errors = {}
//       //const validName = this.validateName(this.departmentName);
//       //this.errors.departmentName = validName.error;
//     // if (validName.valid) {
//     this.formData ={
//     dept_name:this.departmentName
//       }
//     this.instance.post('/assessDeptMigration/insertAssessDept',this.formData).then((result) => {
//       this.insertData = result.data;
//       console.log(this.insertData)
//       this.clearForm();
//        this.select()
//     })
//   },
 openForm() {
  document.getElementById("myForm").style.display = "block";
},
 closeForm() {
  document.getElementById("myForm").style.display = "none";
},
  clearForm() {
      this.departmentId="";
      this.departmentName = "";
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
