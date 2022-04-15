const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../../public'));
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
exports.getInvolvedUpload = upload.any();







exports.updatehomegetInvolvedHeadingSection = (req, res, next)=>{
    
    const {heading, topTitle} = req.body
        const sql = `UPDATE homeGetInvolved SET heading = '${heading}', topTitle = '${topTitle}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            res.json({
                message:"Your get involved Heading has been updated"
            })
        })

}

exports.updatehomegetInvolvedCardTextSection = (req, res, next)=>{
    let sql; let cardName;
    if(req.body.supportCardName){
        const {supportCardDetail,supportButtonName,supportCardName} = req.body
        cardName = supportCardName
         sql = `UPDATE homeGetInvolved SET supportCardName = '${supportCardName}',supportButtonName = '${supportButtonName}', supportCardDetail = '${supportCardDetail}'`;
    }
    if(req.body.joinCardName){
        const {joinCardName, joinCardDetail, joinButtonName} = req.body
        cardName = joinCardName
         sql = `UPDATE homeGetInvolved SET joinCardName = '${joinCardName}', joinButtonName = '${joinButtonName}' , joinCardDetail = '${joinCardDetail}'`;

    }
    if(req.body.sponserCardName){
        const {sponserCardName, sponserCardDetail, sponserButtonName} = req.body
        cardName = sponserCardName
         sql = `UPDATE homeGetInvolved SET sponserCardName = '${sponserCardName}', sponserButtonName = '${sponserButtonName}', sponserCardDetail = '${sponserCardDetail}'`;

    }
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            res.json({
                message:`Your get involved ${cardName}  has been updated`
            })
        })

}

exports.updatehomegetInvolvedCardImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    let imageCardName = req.files[0].fieldname;
//     console.log(req)
//     console.log(req.files[0])
//     if(req.files[0].fieldname === 'supportCardImage'){
// imageCardName = 'supportCardImage'
//     }
//     if(req.files[0].fieldname === 'sponserCardImage'){
//         imageCardName = 'sponserCardImage'
//             }
//             if(req.files[0].fieldname === 'joinCardImage'){
//                 imageCardName = 'joinCardImage'
//                     }
    
  
        const sql = `UPDATE homeGetInvolved SET ${imageCardName} = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.json({
                message:`Your get Involved ${imageCardName} has been updated`
            })
        })

}

exports.gethomegetInvolvedSection = (req, res, next)=>{
    let sql = `SELECT * FROM homeGetInvolved`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.json({
                message:"Database operation failed",
            })
        }
        return res.json({
            message:"Home Get Involved section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home our event text and image

exports.posthomeGetInvolvedTextSection = (req, res, next)=>{
    const {topTitle, heading,supportCardDetail,supportButtonName,supportCardName,joinCardDetail, joinButtonName, joinCardName, sponserCardDetail, sponserButtonName, sponserCardName}  = req.body;
    let sql = `INSERT INTO homeGetInvolved SET ?`
    let data={topTitle: topTitle, heading: heading, supportCardDetail:supportCardDetail, supportCardName:supportCardName, supportButtonName: supportButtonName,joinCardDetail:joinCardDetail, joinCardName:joinCardName, joinButtonName: joinButtonName, sponserCardDetail:sponserCardDetail, sponserCardName:sponserCardName, sponserButtonName: sponserButtonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message:"Database operation failed",
                })
            }
            return res.json({
                message:"Home get involved text section created",
            })
        })
       

}

