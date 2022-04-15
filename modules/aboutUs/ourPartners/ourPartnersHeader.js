const {db} = require('../../../utils/db');



exports.updateOurPartnersHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE aboutUsOurPartnersHeadingSection SET heading = ?, detail = ?, topTitle=?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Partners Heading section updated",
            // data: result[0]
        })
    })
}

exports.getOurPartnersHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM aboutUsOurPartnersHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Our Partners Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postOurPartnersHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO aboutUsOurPartnersHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(200).json({
                    message:"About Us Our Partners Heading section created",
                })
            })
           
    
    }
    