const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');


exports.createFooterSocialMedia =(req,res, next)=>{
    const {facebook, twitter, instagram, youtube} = req.body;
    let sql = `INSERT INTO footerSocialMedia SET ?`
    let data={facebook:facebook, twitter:twitter, instagram:instagram, youtube:youtube}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Footer Social Media section created",
            })
        })

}
exports.updateFacebook = (req,res,next)=>{
    const {facebook} = req.body;
    let sql = `UPDATE footerSocialMedia SET facebook = ?`;
        db.query(sql,[facebook] ,(error,result)=>{
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
                message:"Footer Facebook link updated",
                // data: result[0]
            })
        })
    }
    

exports.updateTwitter = (req,res,next)=>{
const {twitter} = req.body;
let sql = `UPDATE footerSocialMedia SET twitter = ?`;
    db.query(sql,[twitter] ,(error,result)=>{
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
            message:"Footer Twitter link updated",
            // data: result[0]
        })
    })
}

exports.updateInsta = (req,res,next)=>{
    const {instagram} = req.body;
    let sql = `UPDATE footerSocialMedia SET instagram = ?`;
        db.query(sql,[instagram] ,(error,result)=>{
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
                message:"Footer Instagram link updated",
                // data: result[0]
            })
        })
    }

    exports.updateYoutube = (req,res,next)=>{
        const {youtube} = req.body;
        let sql = `UPDATE footerSocialMedia SET youtube = ?`;
            db.query(sql,[youtube] ,(error,result)=>{
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
                    message:"Footer Youtube link updated",
                    // data: result[0]
                })
            })
        }

exports.FetchFooterSocialMedia = (req,res,next)=>{
    let sql = `SELECT * FROM footerSocialMedia`;
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
                message:"Footer Social Media section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


