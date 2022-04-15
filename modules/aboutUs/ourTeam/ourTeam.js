const {db} = require('../../../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../../../public'));
    },
        filename: (req, file, callback)=>{
            const ext = file.mimetype.split("/")[1]
            console.log(file.mimetype)
            callback(null, `${file.originalname}`)
        }
    })

const upload = multer({
    storage: storage
})
exports.uploadOurTeam = upload.any();



exports.createNewTeamMember =(req,res, next)=>{
    const memberImage = req.files[0].filename;
    const {memberName, memberRank, memberRole, memberDetail, buttonName, phone} = req.body;
    let sql = `INSERT INTO aboutUsOurTeam SET ?`
    let data={memberName: memberName, memberRole: memberRole, memberRank:memberRank, memberDetail:memberDetail, buttonName:buttonName, memberImage:memberImage, phone:phone}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Team created",
            })
        })

}
exports.updateExistingTeamMember =(req,res, next)=>{
    let memberImage;
    if(req.files[0]){
        memberImage = req.files[0].filename
    }
    else{
        memberImage = req.body.filename
    }
    // const memberImage = req.files[0].filename;
    console.log("called")
    const {memberName, memberRank, memberRole, memberDetail, buttonName, memberId, phone} = req.body;
    const sql = `UPDATE aboutUsOurTeam SET memberImage = ?, memberName = ?, memberRank =?, memberRole = ? ,memberDetail = ?, buttonName = ?, phone=? WHERE memberId = ?`;

        db.query(sql,[memberImage, memberName, memberRank, memberRole, memberDetail, buttonName, phone, memberId] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Our Team updated",
            })
        })
}
exports.deleteTeamMember =(req,res, next)=>{
    const {memberId} = req.body;
    const sql = `DELETE FROM aboutUsOurTeam WHERE memberId = '${memberId}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"About Us Our Team member deleted",
            })
        })
    
}
exports.getAllTeamMembers =(req,res, next)=>{
    let sql = `SELECT * FROM aboutUsOurTeam`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Teams fetched",
            data:result
            // data: result[0]
        })
    })
}