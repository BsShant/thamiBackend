const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');


exports.createFooterAboutUs =(req,res, next)=>{
    const {detail} = req.body;
    let sql = `INSERT INTO footerAboutUs SET ?`
    let data={detail: detail}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Footer About Us section created",
            })
        })

}

exports.updateFooterAboutUs = (req,res,next)=>{
const {detail} = req.body;
let sql = `UPDATE footerAboutUs SET detail = ?`;
    db.query(sql,[detail] ,(error,result)=>{
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
            message:"Footer About Us section updated",
            // data: result[0]
        })
    })
}

exports.FetchFooterAboutUs = (req,res,next)=>{
    let sql = `SELECT * FROM footerAboutUs`;
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
                message:"Footer About us section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


