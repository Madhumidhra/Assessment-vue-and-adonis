<template >
<div>
    <h1>  EMPLOYEE DISPLAY</h1>
       
        <!-- <label >employeeId:</label>
        <input type="number" placeholder="Enter your Employee Id " v-model="id">
         <br> -->
        <label >employeeName:</label>
        <input type="text" placeholder="Enter your Employee Name " v-model="name">
         <br>
        <label >dateOfBirth:</label>
        <input type="date" placeholder="Enter your Date of Birth " v-model="dob">
         <br>
         <label >dateOfJoining:</label>
        <input type="date" placeholder="Enter your Date of joining " v-model="doj">
         <br>
        <label >email:</label>
        <input type="text" placeholder="Enter your email " v-model="email">
         <br>
        <label >phoneNo:</label>
        <input type="text" placeholder="Enter your Phone No"  minlength="10" v-model="phone">
        <br>
        <label >departmentId:</label>
         <label for="department">Choose a department</label>
         <select class="selectHtml"    v-model="department_id" >
         <option class="select" v-for="department in selectDepartmentData" :value="department.id" :key="department.name">
         {{ department.name}}
    </option>
  </select>
        <br>
        <button @click="insert()">Submit </button>
        <br>
        </div>
  </template>
 <script>
import axios from "axios";
export default {
  data:()=>{return{
    empDetails:[],
    // id:"",
    name:"",
    dob:"",
    doj:"",
    selectDepartmentData : [],
    email:"",
    phone:"",
    department_id:"",
  }},
  mounted: async function () {
    const result = await axios.get('http://127.0.0.1:3333/assessmentDepartments/selectDepartment'  , {headers:{appKey:'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}})
    this.selectDepartmentData = result.data
  },
  methods:{
     async insert()
    {
     
      let empDetails={name:this.name,dob:this.dob,doj:this.doj,email:this.email,phone:this.phone,department_id:this.department_id}
      console.log(empDetails)
      await axios.post('http://127.0.0.1:3333/assessmentEmployees/insertEmployee', empDetails , {headers:{appKey:'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}})
      alert("inserted successfully")
      this.clearForm();
     
      // catch{
      //   alert("cant be inserted")
      // }
 
    },
   clearForm() {
    
    this.name="",
    this.dob="",
    this.doj="",
    this.email="",
    this.phone="",
    this.department_id=""
    }
 
}
  };
</script>
<style>
input[type=text], select {
  width: -50%;
  padding: 12px 20px;
  margin: 70px 20px;
  display: inline-block;
  border: 1px solid rgb(120, 20, 20);
  border-radius: 10px;
  box-sizing: border-box;
}
 input[type=number] {
  width: -50%;
  padding: 12px 20px;
  margin: 20px 0;
  display: inline-block;
  border: 1px solid rgb(120, 20, 20);
  border-radius: 10px;
  box-sizing: border-box;
}
 
input[type=submit] {
  width: -50%;
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
  border-radius: 25px;
  background-color: rgb(138, 133, 133);
 
  padding: 12px 20px;
}
</style>
