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
exports.uploadOurPartner = upload.any();

exports.createOurPartnersHeadingSection = (req, res, next)=>{

}

exports.createNewPartner =(req,res, next)=>{
    const partnerLogo = req.files[0].filename;
    const {partnerName, address, rank} = req.body;
    let sql = `INSERT INTO aboutUsOurPartners SET ?`
    let data={partnerLogo: partnerLogo, partnerName: partnerName, address:address, rank:rank}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Partners created",
            })
        })

}
exports.updateExistingPartner =(req,res, next)=>{
    let partnerLogo;
    if(req.files[0]){
        partnerLogo = req.files[0].filename
    }
    else{
        partnerLogo = req.body.filename
    }
    const {partnerName, partnerId, address, rank} = req.body;

    const sql = `UPDATE aboutUsOurPartners SET partnerLogo = ?, partnerName = ?, address = ?, rank=? WHERE partnerId = ?`;

        db.query(sql,[partnerLogo,partnerName, address, rank, partnerId],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Our Partners updated",
            })
        })
}
exports.deletePartner =(req,res, next)=>{
    const {partnerId} = req.body;
    const sql = `DELETE FROM aboutUsOurPartners WHERE partnerId = '${partnerId}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Our Partners deleted",
            })
        })
    
}
exports.getAllPartners =(req,res, next)=>{
    let sql = `SELECT * FROM aboutUsOurPartners`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Partners fetched",
            data:result
            // data: result[0]
        })
    })
}