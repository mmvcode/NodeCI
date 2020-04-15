const requireLogin = require("../middlewares/requireLogin");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const { accessKeyId, secretAccessKey, region, bucket } = keys.aws;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, async (req, res) => {
    const userId = req.user.id;
    const key = `${userId}/${uuid()}.jpeg`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: bucket,
        ContentType: "image/*",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });
};
