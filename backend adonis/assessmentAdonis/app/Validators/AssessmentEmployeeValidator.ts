import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AssessmentEmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */


  public schema = schema.create({
     //id:schema.number([ ]),
     name:schema.string([rules.alpha({allow:['space']})]),
     dob:schema.date(),
     doj:schema.date(),
     email:schema.string([rules.email({ignoreMaxLength: true,allowIpDomain: true,domainSpecificValidation: true,})]),
     phone:schema.string([rules.mobile({locale : ['en-IN']})]),
     department_id:schema.number([rules.exists({table : 'assessment_departments', column : 'id'})])
  })

  public messages: CustomMessages = {}
}

