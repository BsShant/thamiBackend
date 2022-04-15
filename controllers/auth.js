const bcrypt = require('bcryptjs');
const {db} = require('../utils/db');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail')

exports.register = async(req, res, next)=>{
    const {email, password, username} = req.body;
    let sql = 'INSERT INTO users SET ?'
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    let data = {username: username, password:hash, email:email}
    db.query(sql,data,(error,result)=>{
        if(error) throw error
        console.log(result)
        res.send({
            message:"New user created"
        })
    })

}

exports.login = async(req, res, next)=>{
    const {password, username} = req.body;
    let sql = 'SELECT * FROM users WHERE username = ?'
  
    db.query(sql,[username],async(error,result)=>{
        
        console.log(result)
        if(result.length==0){
            return res.status(401).json({
                message:"The username or password do not match",
                user: null,
                token : null
            });
        }
        const checkPassword = await bcrypt.compare(password, result[0].password)
        if(!checkPassword){
            return res.status(401).json({
                message:"The username or password do not match",
                user: null,
                token : null
            });
        }
        else{
            const id = result[0].id
            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                expiresIn: 21600
            })
            // const cookieOption = {
            //     expires: new Date(
            //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            //     ),
            //     httpOnly: true
            // }
            // res.cookie('jwt', token, cookieOption)
            return res.json({
                message: 'The user is found',
                user: result[0],
                token : token
            })
        }
       


    })

}

exports.changePassword = (req,res,next)=>{
    const {oldPassword, newPassword} = req.body;
    const {userId} = req;
    let sql = 'SELECT * FROM users WHERE id = ?'
  
    db.query(sql,[userId],async(error,result)=>{
        if(result.length==0){
            return res.status(401).json({
                message:"The user is not found"
            });
        }
        const checkPassword = await bcrypt.compare(oldPassword, result[0].password)
        if(!checkPassword || !result){
            return res.status(401).json({
                message:"The password did not match"
            });
        }
        else{
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(newPassword, salt);
            let newSql = 'UPDATE users SET password = ? WHERE id = ?';
            db.query(newSql,[hash,result[0].id],async(error,result)=>{
                if(!result){
                    return res.status(401).json({
                        message: 'The user is not found'
                    });
                }
                return res.json({
                    message: 'Password Changed Successfully'
                    
                })
            })
        }
    })
}

exports.changeEmail = (req,res,next)=>{
    const {email, newEmail} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?'
  
    db.query(sql,[email],async(error,result)=>{
        if(result.length==0){
            return res.status(401).json({
                message:"The email is not registered"
            });
        }
        if(!result){
            return res.status(401).json({
                message:"The user is not found"
            });
        }
        else{
           
            let newSql = 'UPDATE users SET email = ? WHERE id = ?';
            db.query(newSql,[newEmail,result[0].id],async(error,result)=>{
                if(!result){
                    return res.status(401).json({
                        message: 'Database operation error'
                    });
                }
                return res.json({
                    message: 'Email Changed Successfully'
                    
                })
            })
        }
    })
}
exports.changeUsername = (req,res,next)=>{
    const {newUsername, username} = req.body;
    let sql = 'SELECT * FROM users WHERE username = ?'
  
    db.query(sql,[username],async(error,result)=>{
        if(result.length==0){
            return res.status(401).json({
                message:"The username is not registered"
            });
        }
        if(!result){
            return res.status(401).json({
                message:"The user is not found"
            });
        }
        else{
           
            let newSql = 'UPDATE users SET username = ? WHERE id = ?';
            db.query(newSql,[newUsername,result[0].id],async(error,result)=>{
                if(!result){
                    return res.status(401).json({
                        message: 'Database operation error'
                    });
                }
                return res.json({
                    message: 'Username Changed Successfully'
                    
                })
            })
        }
    })
}

exports.getMe = (req, res, next)=>{
    let sql = 'SELECT * FROM users WHERE id = ?'
  
    db.query(sql,[req.userId],async(error,result)=>{
        if(error){
            return res.status(401).json({
                message:"Database operation error",
                user:null

            });

        }
        if(!result){
            return res.status(401).json({
                message:"The user is not found",
                user:null

         });
        

        }
        return res.status(200).json({
            message: 'The user is found',
            user: result[0],
        })
    })
}

exports.logout = (req, res, next)=>{
    return res.status(200).json({
        message: "The user has logged out",
        user: null
    })
}


exports.forgotPassword = (req, res, next)=>{
    let sql = 'SELECT * FROM users WHERE email = ?'
    const {email} = req.body;

    db.query(sql,[email],async(error,result)=>{
        
        if(result.length==0){
            return res.status(401).json({
                message:"The email is not registered"
            });
        }
        if(error){
            console.log(error)
            return res.status(400).json({
                message: "Database operation failed"
            });
        }
        else{
            const secret = process.env.JWT_SECRET + result[0].password
            const payload = {
                email:result[0].email,
                id : result[0].id

            }
            const token = jwt.sign(payload, secret,{
                expiresIn: "15m"
            })
           
            // const link = `https://bishant.nepalthamisociety.org/reset-password/${result[0].id}/${token}`
           const link = `http://localhost:3000/reset-password/${result[0].id}/${token}`
            console.log(link)
            const options ={
                subject:'Reset password',
                html: `<div>
                        <p>Your Password reset Link is</p>
                         <a href='${link}'>${link}</a>
                        </div>`,
                // text: link,
                email:email}
            try {
                const dmail =  await sendEmail(options)

                return res.status(200).json({
                    message: 'The email was send to your address',
                   
                })   

            } catch (error) {
              return res.status(400).json({
                message: 'The email was not send',
               
            })   
            }
           
        }

       


    })
}

exports.resetPassword = (req,res,next)=>{
    const {password, confirm,id, token} = req.body;
    console.log(id)
    if(password!==confirm){
        return res.status(400).json({message:"The password do not match"});

    }
    let sql = 'SELECT * FROM users WHERE id = ?'

        db.query(sql,[id],async(error,result)=>{

        if(!result){
            return res.status(401).json({message:"The link is not valid"});
        }
        if(error){
            console.log(error)
            return res.status(401).json({message:"Database operation failed"});
        }
        else{
            let email = result[0].email

            console.log(result[0])
            const secret = process.env.JWT_SECRET + result[0].password
            try {
                const payload = jwt.verify(token, secret)
                if(!payload){
                    return res.status(400).json({message:"The link is not valid"});
    
                }
                const salt = await bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(password, salt);
                let newSql = 'UPDATE users SET password = ? WHERE id = ?';
       
                    db.query(newSql,[hash, id],async(error,result)=>{
                          if(error){
                            console.log(error)
                           return res.status(401).json({message:"Database operation failed"});
                            }    
                            console.log(result)
                            if(!result){
                               return res.status(401).json({message:"Database operation failed"});
                            }
                            const options ={
                                subject:'Reset password',
                                html: `<div>
                                        <p>Your Password has been reset</p>
                                        </div>`,
                                // text: link,
                                email:email}
                                const dmail =  await sendEmail(options)
                                return res.status(200).json({
                                message:"password updated"
                                
                            })
       })      
            } catch (error) {
                return res.status(400).json({message:"The link is not valid"});

            }
           
           
        }
    })

}