/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.get('selectDepartment','AssessmentDepartmentsController.selectDepartment')
  Route.post('insertDepartment','AssessmentDepartmentsController.insertDepartment')
  Route.patch('updateDepartment','AssessmentDepartmentsController.updateDepartment')
  Route.delete('deleteDepartment','AssessmentDepartmentsController.deleteDepartment')
  Route.get('ascendingOrder','AssessmentDepartmentsController.ascendingOrder')
  Route.get('decendingOrder','AssessmentDepartmentsController.decendingOrder')
  }).prefix('assessmentDepartments').middleware('Auth')
  Route.group(() => {
    Route.get('selectEmployee','AssessmentEmployeesController.selectEmployee')
    Route.post('insertEmployee','AssessmentEmployeesController.insertEmployee')
    Route.patch('updateEmployee','AssessmentEmployeesController.updateEmployee')
    Route.delete('deleteEmployee','AssessmentEmployeesController.deleteEmployee')
    Route.get('ascendingOrder','AssessmentEmployeesController.ascendingOrder')
  Route.get('decendingOrder','AssessmentEmployeesController.decendingOrder')
    Route.get('joins','AssessmentEmployeesController.joins')
    }).prefix('assessmentEmployees').middleware('Auth')