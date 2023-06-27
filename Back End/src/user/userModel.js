var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fname:{
    type:String,
    require:true
  },
  lname:{
    type:String,
    require:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo:[
    {
      title:{
        type:String,
        require:false,
      },
      desc:{
        type:String,
        required:false,
      },
      target_date:{
        type:String,
        required:false,
      },
      status:{
        type:String,
        required:false,
      },
      priority:{
        type:String,
        required:false,
      }

    }
  ]
});
module.exports = mongoose.model("users", userSchema);
