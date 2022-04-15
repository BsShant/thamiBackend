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
exports.uploadEventNews = upload.any();

exports.createNews = (req, res, next) => {
  const image = req.files.filter((item, id) => item.fieldname == "image")[0]
    .filename;

  const authorImage = req.files.filter(
    (item, id) => item.fieldname == "authorImage"
  )[0].filename;
  // const image = req.files[0].filename;
  const { title, detail, buttonName, authorName, authorDescription } = req.body;
  let sql = `INSERT INTO eventNews SET ?`;
  let data = {
    title: title,
    detail: detail,
    buttonName: buttonName,
    image: image,
    authorImage: authorImage,
    authorName: authorName,
    authorDescription: authorDescription,
  };
  db.query(sql, data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(201).json({
      message: "Event News created",
    });
  });
};
exports.updateNewsAuthorBox = (req, res, next) => {
  let image;
  if (req.files[0]) {
    authorImage = req.files[0].filename;
  } else {
    authorImage = req.body.filename;
  }
  const { authorName, authorDescription, id } = req.body;
  const sql = `UPDATE eventNews SET authorName = ?, authorImage = ?, authorDescription = ? WHERE id = ?`;

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
        message: "News Author Box updated",
      });
    }
  );
};
exports.updateExistingNews = (req, res, next) => {
  let image;
  if (req.files[0]) {
    image = req.files[0].filename;
  } else {
    image = req.body.filename;
  }
  const { title, detail, buttonName, id } = req.body;
  const sql = `UPDATE eventNews SET title = ?, image = ?, detail = ?,buttonName = ? WHERE id = ?`;

  db.query(sql, [title, image, detail, buttonName, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event News updated",
    });
  });
};
exports.deleteNews = (req, res, next) => {
  const { id } = req.body;
  const sql = `DELETE FROM eventNews WHERE id = '${id}'`;

  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event News deleted",
    });
  });
};
exports.getAllNews = (req, res, next) => {
  let sql = `SELECT * FROM eventNews`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        message: "Database operation failed",
      });
    }
    return res.status(200).json({
      message: "Event News fetched",
      data: result,
      // data: result[0]
    });
  });
};
