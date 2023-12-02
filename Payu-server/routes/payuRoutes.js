const express = require("express");
const router = express.Router();
const crypto = require("crypto");
router.post("/hash", async (req, res) => {
  const { name, email, amount, productInfo, transactionId } = req.body;
  const data = {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_MERCHANT_SALT,
    txnid: transactionId,
    amount: amount,
    productInfo: "Test Product",
    firstname: name,
    email: email,
    udf1: "details1",
    udf2: "details2",
    udf3: "details3",
    udf4: "details4",
    udf5: "details5",
  };
  const cryp = crypto.createHash("sha512");
  const stringHash =
    data.key +
    "|" +
    data.txnid +
    "|" +
    data.amount +
    "|" +
    data.productInfo +
    "|" +
    data.firstname +
    "|" +
    data.email +
    "|" +
    data.udf1 +
    "|" +
    data.udf2 +
    "|" +
    data.udf3 +
    "|" +
    data.udf4 +
    "|" +
    data.udf5 +
    "||||||" +
    data.salt;
  cryp.update(stringHash);
  const hash = cryp.digest("hex");
  console.log({ hash: hash, transactionId: transactionId });
  return res.status(200).send({ hash: hash, transactionId: transactionId });
});
router.post("/success", async (req, res) => {
  console.log("req.body", req.body);
  return res.redirect("http://localhost:3000/payment-success");
});
router.post("/failure", async (req, res) => {
  console.log("req.body", req.body);
  return res.redirect("http://localhost:3000/payment-failure");
});
module.exports = router;
