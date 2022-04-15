const {db} = require('../../../utils/db');



exports.updateSupportPageHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE getInvolvedSupportPageHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Support community Heading section updated",
            // data: result[0]
        })
    })
}

exports.getSupportPageHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM getInvolvedSupportPageHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved  Support Community Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postSupportPageHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO getInvolvedSupportPageHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(201).json({
                    message:"Get Involved Support Community Heading section created",
                })
            })
           
    
    }
    