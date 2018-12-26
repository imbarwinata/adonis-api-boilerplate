'use strict'

class UserWscController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = UserWscController
