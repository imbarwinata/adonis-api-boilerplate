'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  async index ({response}) {
    let users = await User.query()
                          .with('account')
                          .with('posts')
                          .fetch()

    return response.json(users)
  }

  async show ({params, response}) {
    const user = await User.query()
                           .where('id', params.id)
                           .with('account')
                           .with('posts')
                           .fetch()

    return response.json(user)
  }

  async store ({request, response}) {
    // Rules of Validation
    const rules = {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
    // Validation
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(201).json({
        status: "Failed",
        message: validation._errorMessages[0].message
      })
    }

    const userInfo = request.only(['username', 'email', 'password'])

    const user = new User()
    user.username = userInfo.username
    user.email = userInfo.email
    user.password = userInfo.password

    await user.save()

    return response.status(201).json(user)

  }

  async update ({params, request, response}) {
    // Rules of Validation
    const rules = {
      password: 'required'
    }
    // Validation
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(201).json({
        status: "Failed",
        message: validation._errorMessages[0].message
      })
    }

    const userInfo = request.only(['username', 'email', 'password'])

    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({data: 'Resource not found'})
    }
    user.username = userInfo.username
    user.email = userInfo.email
    user.password = userInfo.password

    await user.save()

    return response.status(200).json(user)
  }

  async delete ({params, response}) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await user.delete()

    return response.status(204).json({
      status: "OK",
      message: "User deleted"
    })
  }
}

module.exports = UserController
