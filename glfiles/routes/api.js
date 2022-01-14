const express = require('express');
const router = express.Router();
const fileService = require('../services/file.service.js');
const app = express();
const options = fileService.getFileOptions();
const multer = require('multer')(options);

router.get('/files', fileService.getAll);
router.delete('/files/:id', fileService.deleteFile);
router.get('/files', fileService.getAll);
router.post('/upload', multer.any(), fileService.uploadFile);
module.exports = router;