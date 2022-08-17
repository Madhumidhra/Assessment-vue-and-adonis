<template >
    <h1>DISPLAY Department</h1>
    <div>
        <label >departmentName:</label>
        <input type="text" placeholder="Enter your department Name " v-model="name">
         <br>
       
        <button @click="insertDept()" >Submit</button>
        <br>
    </div>
  </template>
 <script>
import axios from "axios";
export default {
  data:()=>{return{
    departmentDetails:[],
    
    name:"",
   
  }},
  methods:{
     async insertDept()
    {
      let departmentDetails={name:this.name}
      console.log(departmentDetails)
      await axios.post('http://127.0.0.1:3333/assessmentDepartments/insertDepartment', departmentDetails , {headers:{appKey:'SrGJANasPqmZ_K7bsGywJhf6HPmR6VSz'}})
      alert("inserted successfully"),
      this.clearForm();
     
    },
    clearForm() {
      this.id="";
      this.name = "";
    }
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
