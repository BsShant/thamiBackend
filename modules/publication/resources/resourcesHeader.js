const {db} = require('../../../utils/db');



exports.updateResourcesHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE publicationResourceHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication our resources Heading section updated",
            // data: result[0]
        })
    })
}

exports.getResourcesHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM publicationResourceHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication our resources Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postResourcesHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO publicationResourceHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(201).json({
                    message:"Publication our resources Heading section created",
                })
            })
           
    
    }
    