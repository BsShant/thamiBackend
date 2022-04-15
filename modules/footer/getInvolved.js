const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');


exports.createFooterGetInvolved =(req,res, next)=>{
    const {detail, buttonName} = req.body;
    let sql = `INSERT INTO footerGetInvolved SET ?`
    let data={detail: detail, buttonName:buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Footer Get Involved section created",
            })
        })

}

exports.updateFooterGetInvolved = (req,res,next)=>{
const {detail, buttonName} = req.body;
let sql = `UPDATE footerGetInvolved SET detail = ?, buttonName=?`;
    db.query(sql,[detail, buttonName] ,(error,result)=>{
        if(error){
            return res.status(400).json({
                message:"Database operation failed",
            })
        }
        if(!result){
            return res.status(404).json({
                message:"The item doesn't exist"
            })
        }
        return res.status(200).json({
            message:"Footer Get Involved section updated",
            // data: result[0]
        })
    })
}

exports.FetchFooterGetInvolved = (req,res,next)=>{
    let sql = `SELECT * FROM footerGetInvolved`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.statu(400).json({
                    message:"Database operation failed",
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:"Footer Get Involved section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


