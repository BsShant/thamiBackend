const sendEmail = require('../utils/sendEmail')
const {db} = require('../utils/db');
const path = require('path');

exports.applyRegistration=async(req,res, next)=>{
    
console.log("fetched",req.body)
    const {name, email, message, country, city, phone} = req.body;
    let sql = `INSERT INTO registration SET ?`
    let data={name: name, email:email, phone:phone
        , country: country, city:city, message:message}
        db.query(sql,data, async(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
           
            try {
                const {name, email} = req.body;
                const options ={
                    subject:'Request For Registration',
                    // html: `<a href=${link}>${link}</a>`,
                    html: '<p>We recieved your request for registration. We will notify you after reviewing your application.</p>',
                    // name:name,
                    email:email
                }
                const dmail =  await sendEmail(options)

                // return res.status(200).json({
                //     message: 'Message Send',
                   
                // })   
            } catch (error) {
            //   return res.status(400).json({ message: 'The message was not send', })   
                 console.log(error)
            }
            try {
                const {name, message, email, phone} = req.body
                const options ={
                    subject:'Request For Registration',
                    // html: `<a href=${link}>${link}</a>`,
                    html: `<div>
                    <p>A new registration request has beeen received</p>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Contact no: ${phone}</p>
                    <p>Address: ${city + ', ' + country}</p>

                    <p>Message: ${message}</p>
                    </div>`,
                    // name: firstName + " " + lastName,
                    email:process.env.USER_EMAIL
                }
                const dmail =  await sendEmail(options)

                return res.status(200).json({
                    message: 'Registration request Send',
                   
                })   

            } catch (error) {
              return res.status(400).json({
                message: 'The message was not send',
               
            })   
            }
        })

}
exports.rejectRegistration =(req,res, next)=>{
    
    const {id} = req.body;
    let sql = 'UPDATE registration SET status = ? WHERE id = ?';
    db.query(sql,['rejected',id],async(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            let newSql = 'SELECT * FROM registration WHERE id = ?'
            db.query(newSql,[id],async(error,result)=>{
                console.log("reject",result)
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                try {
                    const {email} = result[0]
                    const options ={
                        subject:'Request For Registration',
                        // html: `<a href=${link}>${link}</a>`,
                        html: "<p>Your registration has been reected!</p>",
                        // name: firstName + " " + lastName,
                        email:email
                    }
                    const dmail =  await sendEmail(options)
                } catch (error) {
                  console.log(error)
                   }
                })
            return res.status(200).json({
                message:"Registration request rejected",
            })
        })
}
exports.approveRegistration =(req,res, next)=>{
    

    const {id} = req.body;
    let sql = 'UPDATE registration SET status = ? WHERE id = ?';
    db.query(sql,['approved',id],async(error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            let newSql = 'SELECT * FROM registration WHERE id = ?'
            db.query(newSql,[id],async(error,result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }

                try {

                    const {email} = result[0]

                    const options ={
                        subject:'Request For Registration',
                        // html: `<a href=${link}>${link}</a>`,
                        html: "<p>Your registration has been accepted!</p>",
                        // name: firstName + " " + lastName,
                        email:email
                    }
                    const dmail =  await sendEmail(options)
    
                } catch (error) {
                  console.log(error)
                }
                })
                return res.status(200).json({
                    message: 'The registration has been approved',
                   
                })   
          
            // return res.status(200).json({
            //     message:"Registration request approved",
            // })
        })
}

exports.deleteRegistration =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM registration WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            
            return res.status(200).json({
                message:"Registration request deleted",
            })
        })
    
}
exports.getRegistration =(req,res, next)=>{
    let sql = `SELECT * FROM registration`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Registration request fetched",
            data:result
            // data: result[0]
        })
    })
}