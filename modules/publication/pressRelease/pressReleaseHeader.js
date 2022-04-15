const {db} = require('../../../utils/db');



exports.updatePressReleaseHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE publicationPressReleaseHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication our PressRelease Heading section updated",
            // data: result[0]
        })
    })
}

exports.getPressReleaseHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM publicationPressReleaseHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication our PressRelease Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postPressReleaseHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO publicationPressReleaseHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(201).json({
                    message:"Publication our PressRelease Heading section created",
                })
            })
           
    
    }
    