const { db } = require("../../../utils/db");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../../public"));
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    console.log(file.mimetype);
    callback(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});
exports.uploadEventOurArticles = upload.any();

exports.createOurArticles = (req, res, next) => {
  const image = req.files.filter((item, id) => item.fieldname == "image")[0]
    .filename;
  const authorImage = req.files.filter(
    (item, id) => item.fieldname == "authorImage"
  )[0].filename;
  const { title, detail, buttonName, authorName, authorDescription } = req.body;
  let sql = `INSERT INTO eventOurArticles SET ?`;
  let data = {
    title: title,
    detail: detail,
    buttonName: buttonName,
    image: image,
    authorName: authorName,
    authorDescription: authorDescription,
    authorImage: authorImage,
  };
  db.query(sql, data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(201).json({
      message: "Event OurArticles created",
    });
  });
};
exports.updateArticlesAuthorBox = (req, res, next) => {
  let image;
  if (req.files[0]) {
    authorImage = req.files[0].filename;
  } else {
    authorImage = req.body.filename;
  }
  const { authorName, authorDescription, id } = req.body;
  const sql = `UPDATE eventOurArticles SET authorName = ?, authorImage = ?, authorDescription = ? WHERE id = ?`;

  db.query(
    sql,
    [authorName, authorImage, authorDescription, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(401).json({
          message: "Database operation failed",
        });
      }
      return res.status(200).json({
        message: "Articles Author Box updated",
      });
    }
  );
};
exports.updateExistingOurArticles = (req, res, next) => {
  let image;
  if (req.files[0]) {
    image = req.files[0].filename;
  } else {
    image = req.body.filename;
  }
  const { title, detail, buttonName, id } = req.body;
  const sql = `UPDATE eventOurArticles SET title = ?, image = ?, detail = ?,buttonName = ? WHERE id = ?`;

  db.query(sql, [title, image, detail, buttonName, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event OurArticles updated",
    });
  });
};
exports.deleteOurArticles = (req, res, next) => {
  const { id } = req.body;
  const sql = `DELETE FROM eventOurArticles WHERE id = '${id}'`;

  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event OurArticles deleted",
    });
  });
};
exports.getAllOurArticles = (req, res, next) => {
  let sql = `SELECT * FROM eventOurArticles`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event OurArticles fetched",
      data: result,
      // data: result[0]
    });
  });
};
