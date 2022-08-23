const { body, validationResult, check } = require('express-validator');

// Post Model
const Post = require('../api/models/Post');

// Validation For Post
const postValidationRules = () => {
  return [
    check('body', 'Body Tidak Valid').isString(),

    // Custom Validation
    body('title').custom(async (value, { req }) => {

        // Cek Duplikatnya
        const duplicate = await Post.findOne({ title: value });

        // Checking old title
        if(req.body.oldPostTitle)
        {
            // If duplicate exist and title is changed
            if(value != req.body.oldPostTitle && duplicate){
                throw new Error('Judul Postingan Sudah ada')
            }

        }else{

            // If there is a duplicate
            if(duplicate){
                throw new Error('Judul Postingan Sudah ada')
            }            
        }

        return true;

    })
  ]
}

// Sending Error (Whether Error exist or not)
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  postValidationRules,
  validate,
}