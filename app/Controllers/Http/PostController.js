'use strict'
const Post = use('App/Models/Post')
class PostController {
  async index ({params, response}) {
    const posts = await Post.query()
                            .with('tags')
                            .fetch()

    return response.json(posts)
  }

  async show ({params, response}) {
    const post = await Post.query()
                           .where('userId', params.id)
                           .where('id', params.postId)
                           .with('tag', (query) => {
                            query.where({
                              'postId': params.postId
                            })
                          })
                           .first()

    return response.json(post)
  }

  async store ({request, response}) {
    const postInfo = request.only(['postname', 'email', 'password'])

    const post = new Post()
    post.postname = postInfo.postname
    post.email = postInfo.email
    post.password = postInfo.password

    await post.save()

    return response.status(201).json(post)
  }

  async update ({params, request, response}) {
    const postInfo = request.only(['postname', 'email', 'password'])

    const post = await Post.find(params.id)
    if (!post) {
      return response.status(404).json({data: 'Resource not found'})
    }
    post.postname = postInfo.postname
    post.email = postInfo.email
    post.password = postInfo.password

    await post.save()

    return response.status(200).json(post)
  }

  async delete ({params, response}) {
    const post = await Post.find(params.id)
    if (!post) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await post.delete()

    return response.status(204).json(null)
  }
}

module.exports = PostController
