const userModel = require("../user/userModel");
// var user = require('../user/userModel');
var key = "234567892w929ejn";
var encryptor = require("simple-encryptor")(key);

module.exports.getUser = (userDetails) => {
  return new Promise(function (resolve, reject) {
    console.log(userDetails.email, "email in forgot password");
    userModel
      .findOne({ email: userDetails.email })
      .then((result) => {
        if (result != null && result != undefined) {
          console.log("im in hell");
          resolve({ status: true, msg: "user found successfully" });
        } else {
          reject({ status: false, msg: "Invalid user" });
        }
      })
      .catch((error) => {
        reject({ status: false, msg: "Invalid user" });
      });
  });
};

module.exports.findUser = (userDetails) => {
  console.log("body", userDetails);
  return new Promise(function (resolve, reject) {
    userModel
      .findOne({ email: userDetails.name })
      .then((result) => {
        console.log(result, "result");
        if (result != null && result != undefined) {
          var decrypted = encryptor.decrypt(result.password);
          if (decrypted === userDetails.password) {
            resolve({
              status: true,
              msg: "Validated successfully",
              fname: result.fname,
              lname: result.lname,
              email: result.email,
            });
          } else {
            reject({ status: false, msg: "Invalid credentials" });
          }
        } else {
          reject({ status: false, msg: "Invalid credentials" });
        }
      })
      .catch((error) => {
        reject({ status: false, msg: "Invalid data", error: error });
      });
  });
};

module.exports.addUser = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    var userModelData = new userModel();
    userModelData.fname = userDetails.fname;
    userModelData.lname = userDetails.lname;
    userModelData.email = userDetails.email;
    userModelData.password = encryptor.encrypt(userDetails.password);

    userModelData.save().then(
      (res) => {
        resolve({ status: true, msg: "inserted successfully" });
      },
      (err) => {
        reject({ status: false, msg: "something went wrong" });
      }
    );
  });
};

module.exports.updateUserTodo = (userDetails) => {
  return new Promise(function (resolve, reject) {
    const todoDetails = {
      todo: {
        title: userDetails.title,
        desc: userDetails.desc,
        target_date: userDetails.date,
        status: userDetails.status,
        priority: userDetails.priority,
      },
    };
    userModel
      .findOneAndUpdate(
        { email: userDetails.email },
        { $push: { todo: todoDetails.todo } }
      )
      .then(
        (res) => {
          // console.log(res);
          if (res != null && res != undefined) {
            resolve({ status: true, msg: "success" });
          } else {
            reject({ status: false, msg: "fail" });
          }
        },
        (error) => {
          reject({ status: false, msg: "fail" });
        }
      );
  });
};




module.exports.editTodo = (userDetails) => {
  return new Promise((resolve, reject) => {
    console.log(userDetails);
    userModel
      .findOneAndUpdate(
        { email: userDetails.email, "todo._id": userDetails.id },
        {
          $set: {
            "todo.$.title": userDetails.title,
            "todo.$.desc": userDetails.desc,
            "todo.$.target_date": userDetails.target_date,
            "todo.$.status": userDetails.status,
            "todo.$.priority": userDetails.priority,
          },
        }
      )
      .then((res) => {
        if (res !== null && res!=undefined) {
          resolve({ status: true, msg: "success" });
        } else {
          reject({ status: false, msg: "failed" });
        }
      })
      .catch((err) => {
        reject({ status: false, msg: "failed" });
      });
  });
};











module.exports.getTodo = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    userModel
      .find({ email: userDetails.email }, { todo: 1 })

      .then(
        (res) => {
          if (res != null && res != undefined) {
            const todoItems = res[0].todo;
            const todoValues = todoItems.map((item) => {
              return {
                id: item._id,
                title: item.title,
                desc: item.desc,
                target_date: item.target_date,
                status: item.status,
                priority: item.priority,
              };
            });
            console.log(todoValues);
            resolve({ status: true, msg: todoValues });
          } else {
            reject({ status: false, msg: error });
          }
        },
        (error) => {
          reject({ status: false, msg: error });
        }
      );
  });
};



// operation.put("/:id/:update", async (req, res) => { const notes = req.body; if (notes) { try { const data = await DB.findByIdAndUpdate(req.params.id); let arr = data.notes.filter((item) => { if (item._id == req.params.update) { return ( (item.title = notes.title), (item.description = notes.description) ); } else { return item.title, item.description; } }); await DB.findByIdAndUpdate(req.params.id, { notes: arr, }); res.send("Sucessfull").status(200); return; } catch (err) { res.send(err).status(500); } } });




module.exports.deleteTodo = (userDetails)=>{
  return new Promise(function myFn(resolve,reject){
    console.log(userDetails);
   userModel
     .findOneAndUpdate(
       { email: userDetails.email },
       { $pull: { todo: { _id: userDetails.id } } }
     )
     .then(
       (res) => {
         resolve({ status: true, msg: "success" });
       },
       (err) => {
         reject({ status: false, msg: "failed" });
       }
     );
  })
}



module.exports.resetPassword = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    let encrypted = encryptor.encrypt(userDetails.password);

    let updatePassword = {
      email: userDetails.email,
      password: encrypted,
    };

    console.log(updatePassword);
    console.log(userDetails.email);

    userModel
      .findOneAndUpdate({ email: userDetails.email }, updatePassword)
      .then((res) => {
        console.log("Password updated successfully");
        resolve({ status: true, msg: "Password updated successfully" });
      })
      .catch((err) => {
        console.log("Failed to update password:", err);
        reject({ status: false, msg: "Failed to update password" });
      });
  });
};
