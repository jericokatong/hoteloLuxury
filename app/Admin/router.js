const { getAdmin, registerAdmin, LoginAdmin, LogoutAdmin } = require("./controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/" });

router.get("/admin", getAdmin);
router.post("/admin/register", upload.single("file"), registerAdmin);
router.post("/admin/login", LoginAdmin);
router.delete("/admin/logout", LogoutAdmin);

module.exports = router;
