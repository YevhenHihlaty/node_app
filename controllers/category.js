const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function (request, response) {
    try{
        const categories = await Category.find({ user : request.user.id})
        response.status(200).json(categories)
    }catch (e) {
        errorHandler(response, e)
    }
}
module.exports.getById = async function (request, response) {
    try{
        const category = await Category.findById(request.params.id)
        response.status(200).json(category)
    }catch (e) {
        errorHandler(response, e)
    }
}
module.exports.remove = async function (request, response) {
    try{
        await Category.remove({_id : request.params.id})
        await Position.remove({category : request.params.id})
        response.status(200).json({
            message: 'Category has been deleted'
        })
    }catch (e) {
        errorHandler(response, e)
    }
}
module.exports.create = async function (request, response) {
    console.log(request.user)
    const category = new Category ({
        name: request.body.name,
        imageSrc : request.file ? request.file.path: '',
        user: request.user.id
    })

    try{
        await category.save();
        response.status(201).json(category)
    }catch (e) {
        errorHandler(response, e)
    }
}
module.exports.update = async function(request, response) {
    const updated = {
        name: request.body.name,
        imageSrc: request.file ? request.file.path : ''
    }
    try{
        const category = await Category.findOneAndUpdate(
            {_id: request.params.id},
            {$set: updated},
            {new: true}
        )
        response.status(200).json(category)
    }catch (e) {
        errorHandler(response, e)
    }
}
