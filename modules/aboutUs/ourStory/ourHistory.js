const {db} = require('../../../utils/db');




exports.updateAboutUsOurHistorySection = (req, res, next)=>{
    
    const {ourHistoryTitle, ourHistoryDetail} = req.body
        const sql = `UPDATE aboutUsOurHistory SET ourHistoryTitle = ?, ourHistoryDetail = ?`;
        db.query(sql,[ourHistoryTitle, ourHistoryDetail] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Our History has been updated"
            })
        })

}
exports.getaboutUsOurHistorySection = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsOurHistory`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our History section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}
exports.postAboutUsOurHistorySection = (req, res, next)=>{
    
    const {ourHistoryTitle, ourHistoryDetail} = req.body
    let sql = `INSERT INTO aboutUsOurHistory SET ?`
    let data={ourHistoryTitle: ourHistoryTitle, ourHistoryDetail:ourHistoryDetail}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our History text section created",
            })
        })
}