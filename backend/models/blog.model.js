const { required, object } = require('joi');
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
        content:{
            type:String,
            // required:true,
            default:"No description"
        },
        location:{
            type:JSON
        }
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