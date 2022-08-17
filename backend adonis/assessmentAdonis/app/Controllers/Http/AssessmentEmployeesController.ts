// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import assessmentEmployees from "App/Models/AssessmentEmployee";
import AssessmentEmployeeValidator from "App/Validators/AssessmentEmployeeValidator";
export default class AssessmentEmployeesController {

    public async selectEmployee()
     {
       return await assessmentEmployees.all();
     }
//all works validation
     public async insertEmployee({request}){
        await request.validate(AssessmentEmployeeValidator)
          try{
                const addEmp=new assessmentEmployees();
                addEmp.id=request.input('id')
                addEmp.name=request.input('name')
                addEmp.dob=request.input('dob')
                addEmp.doj=request.input('doj')
                addEmp.email=request.input('email')
                addEmp.phone=request.input('phone')
                addEmp.departmentId=request.input('department_id')
                 await addEmp.save()
                 return(' Successfully Inserted !');
          }
          catch{
              return("already exists")
          }
       }
       public async updateEmployee({request})
    {
        try
    {
        const updateEmp = await assessmentEmployees.findOrFail(request.input('id'))
        updateEmp.name=request.input('name')
        updateEmp.dob=request.input('dob')
        updateEmp.doj=request.input('doj')
        updateEmp.email=request.input('email')
        updateEmp.phone=request.input('phone')
        updateEmp.departmentId=request.input('department_id')
        await updateEmp.save()
        return updateEmp
        }
        catch
        {
            return("Already exits ")
        }
    }
    public async deleteEmployee({request})
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
    public async joins ()
    {
            const fetchData =  await Database
                            .from('assessmentEmployees')
                            .join('assessment_department', 'assessment_employees.department_id', '=', 'assessment_department.id')
                            .select('assessmentEmployees.id')
                            .select('assessmentEmployees.name')
                            .select('assessmentEmployees.dob')
                            .select('assessmentEmployees.doj')
                            .select('assessmentEmployees.email')
                            .select('assessmentEmployees.phone')
                            .select('assessmentEmployees.department_id')
                            .select('assessment_department.name')
            if(fetchData[0])
            {
                return fetchData;
            }
            else{
                return "No data to show"
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
 

}


