'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.group(() => {
  // Router User
  Route.post('users', 'UserController.store')
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.delete')

  // Router Account
  Route.post('users/:id/accounts', 'AccountController.store')
  Route.get('users/:id/accounts', 'AccountController.show')
  Route.put('users/:id/accounts', 'AccountController.update')

  // Router User
  Route.post('users/:id/posts', 'PostController.store')
  Route.get('users/:id/posts', 'PostController.index')
  Route.get('users/:id/posts/:postId', 'PostController.show')
  Route.put('users/:id/posts', 'PostController.update')
  Route.delete('users/:id/posts', 'PostController.delete')
}).prefix('api/v1')
