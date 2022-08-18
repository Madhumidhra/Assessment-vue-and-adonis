import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import assessmentEmployees from "App/Models/AssessmentEmployee";
import AssessmentEmployeeValidator from "App/Validators/AssessmentEmployeeValidator";
export default class AssessmentEmployeesController {

    public async selectEmployee()
     {
       return await assessmentEmployees.all();
     }
//all works validation
     public async insertEmployee({request}:HttpContextContract){
        const employeeInsert=await request.validate(AssessmentEmployeeValidator)
          try{
                const addEmp=new assessmentEmployees()
                //addEmp.id=employeeInsert.id
                addEmp.name=employeeInsert.name
                addEmp.dob=employeeInsert.dob
                addEmp.doj=employeeInsert.doj
                addEmp.email=employeeInsert.email
                addEmp.phone=BigInt(employeeInsert.phone)
                addEmp.departmentId=employeeInsert.department_id
                 await addEmp.save()
                 return(' Successfully Inserted !');
          }
          catch{
              return("already exists")
          }
       }
    public async updateEmployee({request}:HttpContextContract)
    { const employeeUpdate= await request.validate(AssessmentEmployeeValidator)
        try
    {
        const updateEmp = await assessmentEmployees.findOrFail(request.input('id'))
        updateEmp.name=employeeUpdate.name
        updateEmp.dob=employeeUpdate.dob
        updateEmp.doj=employeeUpdate.doj
        updateEmp.email=employeeUpdate.email
        updateEmp.phone= BigInt(employeeUpdate.phone)
        updateEmp.departmentId= employeeUpdate.department_id
        await updateEmp.save()
        return updateEmp
        }
        catch
        {
            return("Already exits ")
        }
    }
    public async deleteEmployee({request}:HttpContextContract)
    {
        try
        {
            (await assessmentEmployees.findOrFail(request.input('id'))).delete();
            return("successfully deleted")
        }
        catch
        {
            return("Already deleted ")
        }
    }

                public async ascendingOrder ()
            {
                const ascen =  assessmentEmployees.all();
                return(await ascen).reverse()
            
            }
            public async decendingOrder ()
            {
                const decen =  assessmentEmployees.all();
                return((await decen).reverse()).reverse()
            
            }

            public async joins()
            {
                const fetchData =  assessmentEmployees.query()
                                          .join('assessment_departments','assessment_employees.department_id','=','assessment_departments.id')
                                          .select('assessment_departments.id')
                                          .select('assessment_departments.name as department_name')
                                          .select('assessment_employees.id')
                                          .select('assessment_employees.name')
                                          .select('assessment_employees.dob')
                                          .select('assessment_employees.doj')
                                          .select('assessment_employees.email')
                                          .select('assessment_employees.phone')

                                          console.log(fetchData)
                                        //   console.log(fetchData[0].$extras['department_name'])

                                          return fetchData;

                                          
                if(fetchData[0])
                {
                    return fetchData;
                }
                else
                {
                return "No data to show";
                }

            }
}


