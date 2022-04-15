const {db} = require('../../utils/db');



exports.updateContactHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE contactHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Contact Heading section updated",
            // data: result[0]
        })
    })
}

exports.getContactHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM contactHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Contact Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postContactHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO contactHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(200).json({
                    message:"Contact Heading section created",
                })
            })
           
    
    }
    