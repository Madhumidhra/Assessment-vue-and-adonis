import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AssessmentEmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

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

