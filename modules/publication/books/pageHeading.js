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
exports.booksImageUpoad = upload.any();


exports.updatePublicationBooksPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE publicationBooksPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Publication Books page heading has been updated"
            })
        })

}
exports.updatePublicationBooksPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE publicationBooksPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Publication Books Page image has been updated"
            })
        })

}

exports.getPublicationBooksPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM publicationBooksPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication Books Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postPublicationBooksPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO publicationBooksPageHeading SET ?`
    let data={pageSubHeading: pageSubHeading, pageHeading: pageHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Books page heading created",
            })
        })
       

}

exports.postPublicationBooksPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO publicationBooksPageHeading SET ?' 
        const data = {image :image}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Publication Books page image section created"
            })
        })

}
