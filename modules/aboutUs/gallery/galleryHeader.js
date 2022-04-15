const {db} = require('../../../utils/db');



exports.updateGalleryHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE aboutUsGalleryHeadingSection SET heading = ?, detail = ?, topTitle=?`;
    db.query(sql,[heading, detail, topTitle] ,(error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Gallery Heading section updated",
            // data: result[0]
        })
    })
}

exports.getGalleryHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM aboutUsGalleryHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Gallery Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postGalleryHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO aboutUsGalleryHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle: topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(201).json({
                    message:"About Us Gallery Heading section created",
                })
            })
           
    
    }
    