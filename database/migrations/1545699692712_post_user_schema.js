'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostUserSchema extends Schema {
  up () {
    this.create('post_user', (table) => {
      table.increments()
      table.integer('userId').unsigned().references('id').inTable('users')
      table.integer('postId').unsigned().references('id').inTable('posts')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_user')
  }
}

module.exports = PostUserSchema
