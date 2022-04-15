const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');
const sendEmail = require('../../utils/sendEmail')

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../../../public'));
    },
        filename: (req, file, callback)=>{
            const ext = file.mimetype.split("/")[1]
            console.log(file.mimetype)
            callback(null, `${file.originalname}`)
        }
    })

const upload = multer({
    storage: storage
})
exports.uploadContact = upload.any();



exports.postMessage=async(req,res, next)=>{
    

    const {name, email, message} = req.body;
    let sql = `INSERT INTO contact SET ?`
    let data={name: name, message: message,email:email}
        db.query(sql,data, async(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            const options ={
                subject:'Message From Visitors',
                // html: `<a href=${link}>${link}</a>`,
                html: `<div>
                <p>We have received a new query</p>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
                </div>`,                name:name,
                email:process.env.USER_EMAIL
            }
            try {
                const dmail =  await sendEmail(options)

                return res.status(200).json({
                    message: 'Message Send',
                   
                })   

            } catch (error) {
              return res.status(400).json({
                message: 'The message was not send',
               
            })   
            }
        })

}
exports.sendMessage =(req,res, next)=>{
    

        db.query(sql,[title, image, detail, buttonName, type, writer, file, id],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Message Send",
            })
        })
}
exports.deleteMessage =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM contact WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Message deleted",
            })
        })
    
}
exports.getMessage =(req,res, next)=>{
    let sql = `SELECT * FROM contact`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Messages fetched",
            data:result
            // data: result[0]
        })
    })
}