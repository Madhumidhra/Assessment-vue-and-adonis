import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'assessment_employee'

  public async up () {
      this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('name')
      table.date('dob')
      table.date('doj')
      table.string('email').unique
      table.bigint('phone')
      table.integer('department_id')
        .references('assessmentDepartment')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
