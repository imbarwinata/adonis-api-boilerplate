'use strict'

const Account = use('App/Models/Account');

class AccountController {
  async index ({response}) {
    let accounts = await Account.all();

    return response.json([accounts]);
  }


  async show ({params, response}) {
    // const account = await Account.find(params.id)
    const account = await Account.query()
                           .where('userId', params.id)
                           .with('user')
                           .fetch();

    return response.json(account);
  }

  async store ({request, response}) {
    const accountInfo = request.only([
      'firstName',
      'lastName'
    ]);

    const account = new Account();
    account.firstName = accountInfo.firstName;
    account.lastName = accountInfo.lastName;

    await account.save();

    return response.status(201).json(account);
  }

  async update ({params, request, response}) {
    const accountInfo = request.only([
      'firstName',
      'lastName'
    ]);

    const account = await User.find(params.id);
    if (!account) {
      return response.status(404).json({data: 'Resource not found'});
    }
    account.firstName = accountInfo.firstName;
    account.lastName = accountInfo.lastName;

    await account.save();

    return response.status(200).json(account);
  }

}

module.exports = AccountController;
