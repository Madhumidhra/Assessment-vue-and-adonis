import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class assessmentEmployees extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public dob: DateTime
  @column()
  public doj: DateTime
  @column()
  public email: string
  @column()
  public phone: bigint
  @column()
  public departmentId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
    empId: any
}
