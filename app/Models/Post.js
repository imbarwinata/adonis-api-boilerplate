'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  tags () {
    return this
      .belongsToMany('App/Models/Tag', 'postId', 'id')
      .pivotTable('post_tag')
  }
}

module.exports = Post
