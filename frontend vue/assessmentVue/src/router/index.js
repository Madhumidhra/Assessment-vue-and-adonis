import { createRouter, createWebHistory } from 'vue-router'

import employeeForm from '../components/employeeForm.vue'
import employeeTable from '../components/employeeTable.vue'
import departmentForm from '../components/departmentForm.vue'
import departmentTable from '../components/departmentTable.vue'
import filterDisplay from '../components/filterDisplay.vue'
import filterDisplayEmployee from '../components/filterDisplayEmployee.vue'


 
export default createRouter({
  history: createWebHistory(),
 
  routes: [
 
    {
      path: '/employeeForm',
      name :'formDisplayEmp',
      component: employeeForm,
    },
    {
      path: '/employeeTable',
      name:'tableDisplayEmp',
      component:employeeTable,
    },
    {
      path: '/departmentForm',
      name :'formDisplayDept',
      component: departmentForm,
    },
    {
      path: '/departmentTable',
      name:'tableDisplayDept',
      component:departmentTable,
    },
       {
        path: '/filterDisplay',
        name:'filterdisplaydept',
        component:filterDisplay,
       },
       {
        path: '/filterDisplayEmployee',
        name:'filterdisplaydept',
        component:filterDisplayEmployee,
       },
   
  ],
 
 
 
})

