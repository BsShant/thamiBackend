const {db} = require('../../../utils/db');




exports.updateAboutUsAssociateText = (req, res, next)=>{
    
    const {title, detail} = req.body
        const sql = `UPDATE aboutUsAssociate SET title = ?, detail = ?`;
        db.query(sql,[title, detail] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About Us Associate section has been updated"
            })
        })

}
exports.updateaboutUsAssociateImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
    const sql = `UPDATE aboutUsAssociate SET image = ?`;
    db.query(sql,[image] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(201).json({
                message:"About Us Associate image updated"
            })
        })

}
exports.getaboutUsAssociate = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsAssociate`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Associate section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}
exports.postAboutUsAssociateText = (req, res, next)=>{
    
    const {title, detail} = req.body
    let sql = `INSERT INTO aboutUsAssociate SET ?`
    let data={title: title, detail:detail}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Associate text section created",
            })
        })
}