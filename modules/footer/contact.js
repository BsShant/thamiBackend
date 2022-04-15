const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');


exports.createFooterContact =(req,res, next)=>{
    const {phone, address, email} = req.body;
    let sql = `INSERT INTO footerContact SET ?`
    let data={phone:phone, address:address, email:email}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Footer Contact section created",
            })
        })

}

exports.updateFooterContact = (req,res,next)=>{
const {phone, email, address} = req.body;
let sql = `UPDATE footerContact SET phone = ?, email=?, address=?`;
    db.query(sql,[phone, email, address] ,(error,result)=>{
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
            message:"Footer contact section updated",
            // data: result[0]
        })
    })
}

exports.FetchFooterContact = (req,res,next)=>{
    let sql = `SELECT * FROM footerContact`;
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
                message:"Footer contact section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


