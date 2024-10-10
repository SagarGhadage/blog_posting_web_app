const { required } = require('joi');
const mongoose=require('mongoose');
/**
 * @def blog schema
*/
const blogSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            // unique:true,
            lowercase:true,
          },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            // required:true,
            default:"No description"
        },
    },
    {
        timestamps:true
    }
)
/**
 * create model Blog
 * */
/**
 * @typedef Blog
 * it shud import like 
 * const Blog=require('<path>').Blog
 */
const Blog = mongoose.model("Blog",blogSchema);
 module.exports = {Blog,blogSchema}