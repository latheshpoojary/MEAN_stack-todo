var userService = require("../user/userService");
var loginUser = async (req, res) => {
  let result = null;
  try {
    console.log("body", req.body);
    result = await userService.findUser(req.body);

    if (result.status) {
      res.send({
        status: true,
        msg: "Validated Successfully",
        fname: result.fname,
        lname: result.lname,
        email: result.email,
      });
    } else {
      res.send({ status: false, msg: "invali credential" });
    }
  } catch (error) {
    res.send({ status: false, msg: "something went wrong" });
  }
};

var addUser = async (req, res) => {
  return new Promise(function myFn(resolve, reject) {
    console.log(req.body, "req body");
    var result = userService.addUser(req.body);
    if (result) {
      res.send({ status: true, Message: "User added successfully" });
      resolve(true);
    } else {
      res.send({ status: false, Message: "Not added successfull" });
      reject(false);
    }
  });
};

const addTodo = async (req, res) => {
  try {
    console.log(req.body);
    const result = await userService.updateUserTodo(req.body);
    if (result.status) {
      res.send({ status: true, msg: "successfully updated" });
    }
  } catch (error) {
    res.send({ status: false, msg: "something went wrong" });
  }
};


 var editTodo = async(req,res)=>{
  try {
    const result = userService.editTodo(req.body);
    if(result.status){
      res.send({status:true,msg:"success"});
    }
    else{
      res.send({status:false,msg:"failed"});
    }
  } catch (error) {
    res.send({ status: false, msg: "failed" });
  }
 }


var getAllTodo = async (req, res) => {
  try {
    const result = await userService.getTodo(req.body);
    
    
    if (result) {
      res.send({ status: true, msg: result.msg });
    }
  } catch (error) {
    res.send({ status: false, data: null });
  }
};



var forgotVerify = async (req, res) => {
  let result = null;
  try {
    let result = await userService.getUser(req.body);
    console.log(result.status, "status");
    if (result.status) {
      res.send({ status: true, msg: "found user" });
    } else {
      res.send({ status: false, msg: "not found user" });
    }
  } catch (err) {
    res.send({ status: false, msg: "something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    let result = await userService.resetPassword(req.body);
    if (result.status) {
      res.send({ status: true, msg: "password reset successfully" });
    } else {
      res.send({ status: false, msg: "passwor not reset" });
    }
  } catch (error) {
    res.send({ status: false, msg: "passwor not reset" });
  }
};

const register = async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    if (result.status) {
      res.send({ status: true, msg: "successfully registered" });
    }
  } catch (error) {
    res.send({ status: false, msg: "something went wrong" });
  }
};

module.exports = {
  loginUser,
  addUser,
  editTodo,
  forgotVerify,
  resetPassword,
  register,
  addTodo,
  getAllTodo,
};
