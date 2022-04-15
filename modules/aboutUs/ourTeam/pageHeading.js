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
exports.ourTeam = upload.any();


exports.updateAboutUsOurTeamPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE aboutUsOurTeamPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Our Team page heading has been updated"
            })
        })

}
exports.updateAboutUsOurTeamPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsOurTeamPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Our Team Page image has been updated"
            })
        })

}

exports.getaboutUsOurTeamPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsOurTeamPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Team Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postAboutUsOurTeamPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO aboutUsOurTeamPageHeading SET ?`
    let data={pageSubHeading: pageSubHeading, pageHeading: pageHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Team page heading created",
            })
        })
       

}

exports.postAboutUsOurTeamPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsOurTeamPageHeading SET ?' 
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
                message:"About Us Our Team page image section created"
            })
        })

}
