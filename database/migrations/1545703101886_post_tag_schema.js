'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostTagSchema extends Schema {
  up () {
    this.create('post_tag', (table) => {
      table.increments()
      table.integer('tagId').unsigned().references('id').inTable('tags')
      table.integer('postId').unsigned().references('id').inTable('posts')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_tag')
  }
}

module.exports = PostTagSchema
