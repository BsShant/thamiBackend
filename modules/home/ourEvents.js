const {db} = require('../../utils/db');







exports.updatehomeOurEventHeadingSection = (req, res, next)=>{
    
    const {heading, topTitle} = req.body
        const sql = `UPDATE homeOurEvent SET heading = ?, topTitle = ?`;
        db.query(sql,[heading, topTitle], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:"Your our event Heading has been updated"
            })
        })

}

exports.updatehomeOurEventCardSection = (req, res, next)=>{
    let sql; let cardName;
    console.log("called", req.body)
    if(req.body.blogsCardName){
        const {blogsCardName, blogsCardDetail, blogsButtonName} = req.body
        cardName = blogsCardName
         sql = `UPDATE homeOurEvent SET blogsCardName = ?,blogsButtonName = ?, blogsCardDetail = ?`;
         db.query(sql,[blogsCardName, blogsButtonName, blogsCardDetail], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:`Your our event ${cardName}  has been updated`
            })
        })
    }
    else if(req.body.newsCardName){
        const {newsCardName, newsCardDetail, newsButtonName} = req.body
        cardName = newsCardName
         sql = `UPDATE homeOurEvent SET newsCardName = ?, newsButtonName = ?, newsCardDetail = ?`;
         db.query(sql,[newsCardName, newsButtonName, newsCardDetail], (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.json({
                    message:"The item doesn't exist",
                })
            }
            return res.json({
                message:`Your our event ${cardName}  has been updated`
            })
        })

    }
    else if(req.body.ourArticlesCardName){
        const {ourArticlesCardName, ourArticlesCardDetail, ourArticlesButtonName} = req.body
        cardName = ourArticlesCardName
         sql = `UPDATE homeOurEvent SET ourArticlesCardName = ?, ourArticlesButtonName = ?, ourArticlesCardDetail = ?`;
         db.query(sql,[ourArticlesCardName, ourArticlesButtonName, ourArticlesCardDetail], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:`Your our event ${cardName}  has been updated`
            })
        })

    }
    else{
        return res.status(404).json({
            message:`The item is not found`
        })
    }
   
        

}

exports.gethomeOurEventSection = (req, res, next)=>{
    let sql = `SELECT * FROM homeOurEvent`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                message:"Database operation failed",
            })
        }
        if(!result){
            return res.status(404).json({
                message:"The item doesn't exist",
            })
        }
        return res.status(200).json({
            message:"Home Our Event section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home our event text and image

exports.posthomeOurEventSection = (req, res, next)=>{
    const {topTitle, heading,newsCardDetail,newsButtonName,newsCardName,blogsCardDetail, blogsButtonName, blogsCardName, ourArticlesCardDetail, ourArticlesButtonName, ourArticlesCardName}  = req.body;
    let sql = `INSERT INTO homeOurEvent SET ?`
    let data={topTitle: topTitle, heading: heading, newsCardDetail:newsCardDetail, newsCardName:newsCardName, newsButtonName: newsButtonName,blogsCardDetail:blogsCardDetail, blogsCardName:blogsCardName, blogsButtonName: blogsButtonName, ourArticlesCardDetail:ourArticlesCardDetail, ourArticlesCardName:ourArticlesCardName, ourArticlesButtonName: ourArticlesButtonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message:"Database operation failed",
                })
            }
            return res.json({
                message:"Home Our Event text section created",
            })
        })
       

}

