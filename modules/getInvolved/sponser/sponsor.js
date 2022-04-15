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
exports.SponsorUpload = upload.any();



exports.updateGetInvolvedSponsorImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE getInvolvedSponsor SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Get Involved Donation Image has been updated"
            })
        })

}
exports.updateGetInvolvedSponsorTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail, buttonName} = req.body
        const sql = `UPDATE getInvolvedSponsor SET heading = '${heading}', topTitle = '${topTitle}', detail = '${detail}', buttonName ='${buttonName}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Get Involved Donation Text section has been updated"
            })
        })

}

exports.getGetInvolvedSponsorSection = (req, res, next)=>{
    let sql = `SELECT * FROM getInvolvedSponsor`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Donation section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home about us text and image

exports.postGetInvolvedSponsorTextSection = (req, res, next)=>{
    const {topTitle, heading, detail, buttonName}  = req.body;
    let sql = `INSERT INTO getInvolvedSponsor SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail, buttonName:buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Get Involved Donation text section created",
            })
        })
       

}

exports.postGetInvolvedSponsorImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO getInvolvedSponsor SET ?' 
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
                message:"Get Involved Donation image section created"
            })
        })

}