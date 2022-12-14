import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import assessment_department from "App/Models/AssessmentDepartment";
import AssessmentDepartmentValidator from "App/Validators/AssessmentDepartmentValidator";


export default class AssessmentDepartmentsController {

             //select department and list all data from the database
            public async selectDepartment()
            {
            return await assessment_department.all();
            }
        //insert
        public async insertDepartment({request}:HttpContextContract)
        {           //const result=await request.validate(DeptValidator){
                    // console.log(request.body())
        const departmentInsert =await request.validate(AssessmentDepartmentValidator)
                try
                {
                    const add = new assessment_department()
                    //add.id= request.input('id')
                    add.name = departmentInsert.name
                    await add.save()
                    return(' Successfully Inserted !');
                }
                catch
                {
                    return("Incorrect Values already exists department id")
                }
        }

        public async updateDepartment({request}:HttpContextContract)
        {
            const departmentUpdate =await request.validate(AssessmentDepartmentValidator)
            try
            {
        
                const update = await assessment_department.findOrFail(request.input('id'))
                update.name =  departmentUpdate.name
                await update.save()
                return update
            }
            catch{return("Already exits  department id cannot be updated ")
            }
        }

        public async deleteDepartment({request}:HttpContextContract){
            try{
               (await assessment_department.findOrFail(request.input('id'))).delete();
               return("deleted successfully");
            }
            catch{return("already deleted")
        }
 
}


            public async ascendingOrder ()
            {
                const ascen =  assessment_department.all();
                return(await ascen).reverse()
            
            }
            public async decendingOrder ()
            {
                const decen =  assessment_department.all();
                return((await decen).reverse()).reverse()
            
            }



}


