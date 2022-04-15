const {db} = require('../../../utils/db');



exports.updateBooksHeaderSection = (req,res,next)=>{
const {heading, detail, topTitle } = req.body;
let sql = `UPDATE publicationBooksHeadingSection SET heading = ?, detail = ?, topTitle = ?`;
    db.query(sql,[heading, detail, topTitle], (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication our Books Heading section updated",
            // data: result[0]
        })
    })
}

exports.getBooksHeaderSection = (req,res,next)=>{
    let sql = `SELECT * FROM publicationBooksHeadingSection`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication our Books Heading section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


    exports.postBooksHeadingSection = (req, res, next)=>{
        const { heading, detail, topTitle}  = req.body;
        let sql = `INSERT INTO publicationBooksHeadingSection SET ?`
        let data={heading: heading, detail:detail, topTitle:topTitle}
            db.query(sql,data, (error, result)=>{
                if(error){
                    console.log(error)
                    return res.status(401).json({
                        message:"Database operation failed",
                    })
                }
                return res.status(200).json({
                    message:"Publication our Books Heading section created",
                })
            })
           
    
    }
    