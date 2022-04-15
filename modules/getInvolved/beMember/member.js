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
exports.memberUpload = upload.any();



exports.updateGetInvolvedMemberImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE getInvolvedMember SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Get Involved Member Image has been updated"
            })
        })

}
exports.updateGetInvolvedMemberTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail, buttonName} = req.body
        const sql = `UPDATE getInvolvedMember SET heading = ?, topTitle = ?, detail = ?, buttonName =?`;
        db.query(sql,[heading, topTitle, detail,buttonName], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Get Involved Member section has been updated"
            })
        })

}

exports.getGetInvolvedMemberSection = (req, res, next)=>{
    let sql = `SELECT * FROM getInvolvedMember`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Member section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home about us text and image

exports.postGetInvolvedMemberTextSection = (req, res, next)=>{
    const {topTitle, heading, detail, buttonName}  = req.body;
    let sql = `INSERT INTO getInvolvedMember SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail, buttonName:buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Get Involved Member text section created",
            })
        })
       

}

exports.postGetInvolvedMemberImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO getInvolvedMember SET ?' 
        const data = {image :image}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.json({
                message:"Get Involved Member image section created"
            })
        })

}