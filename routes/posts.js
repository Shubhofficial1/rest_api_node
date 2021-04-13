const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// Get all posts

router.get('/', async (req, res) => {
  try {
    const post = await Post.find()
    res.json(post)
  } catch (err) {
    res.json(err.message)
  }
})

// create a post

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })

  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json(err.message)
  }
})

// get single post by id

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.send(post)
  } catch (err) {
    res.json(err.message)
  }
})

// delete single post by id

router.delete('/:id', async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.id })
    res.json(removedPost)
  } catch (err) {
    res.json(err.message)
  }
})

// update post by id

router.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, description: req.body.description } }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router
