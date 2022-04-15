const {db} = require('../../../utils/db');
const path = require('path');
const multer = require('multer');

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
exports.vandMupload = upload.any();


exports.updateGetInvolvedMemberPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE getInvolvedMemberPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Get Involved Be Member page header has been updated"
            })
        })

}
exports.updateGetInvolvedMemberPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE getInvolvedMemberPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Get Involved Be Member page image has been updated"
            })
        })

}

exports.getGetInvolvedMemberPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM getInvolvedMemberPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Be Member page Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postGetInvolvedMemberPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO getInvolvedMemberPageHeading SET ?`
    let data={pageHeading: pageHeading, pageSubHeading: pageSubHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Get Involved Be Member page heading section created",
            })
        })
       

}

exports.postGetInvolvedMemberPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO getInvolvedMemberPageHeading SET ?' 
        const data = {image :image}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(201).json({
                message:"Get Involved Be Member page image section created"
            })
        })

}
