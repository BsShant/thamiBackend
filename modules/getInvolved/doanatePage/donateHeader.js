const {db} = require('../../../utils/db');



exports.updateDonateHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE getInvolvedDonateHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"GetInvolved Donate Info Heading section updated",
            // data: result[0]
        })
    })
}

exports.getDonateHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM getInvolvedDonateHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"GetInvolved  Donate Info Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postDonateHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO getInvolvedDonateHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(200).json({
                    message:"GetInvolved Donate Info Heading section created",
                })
            })
           
    
    }
    