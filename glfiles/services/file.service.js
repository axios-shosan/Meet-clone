const mongoose = require('mongoose');
const File = require('../models/file');
const multer = require('multer');
const fs = require('fs')
const async = require('async')
const path = require('path')
const btoa = require('btoa')

const fileConfig = require('../config/file.config')
const mongoDB = fileConfig.dbConnection;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    getAll: (req, res, next) => {
      File.find((err, files) => {
        if (err) {
          return res.status(404).end();
        }
        console.log('File fetched successfully');
        res.send(files);
      });
    },
    
    getFileOptions: () => {
      return {
        storage: multer.diskStorage({
          destination: fileConfig.uploadsFolder,
          filename: (req, file, cb) => {
            let extension = fileConfig.supportedMimes[file.mimetype]
            let originalname = file.originalname.split('.')[0]
            let fileName = originalname + '-' + (new Date()).getMilliseconds() + '.' + extension
            cb(null, fileName)
          }
        }),
        fileFilter: (req, file, cb) => {
          let extension = fileConfig.supportedMimes[file.mimetype]
          if (!extension) {
            return cb(null, false)
          } else {
            cb(null, true)
          }
        }
      }
    },

    uploadFile: (req, res, next) => {
      let savedModels = []
      async.each(req.files, (file, callback) => {
        let fileModel = new File({
          name: file.filename
        });
        console.log(fileModel);
        fileModel.save((err) => {
          if (err) {
            return next('Error while creating new file', err);
          }
          fileModel.encodedName = btoa(fileModel._id)
          fileModel.save((err) => {
            if (err) {
              return next('Error creating new file', err);
            }
            savedModels.push(fileModel)
            callback()
            console.log('File created successfully');
          })
        });
      }, (err) => {
        if (err) {
          return res.status(400).end();
        }
        return res.send(savedModels)
      })
      console.log("uploading the file");
    },

    downloadFile(req, res, next) {
      console.log("entering the download file function ...");
      File.findOne({ name: req.params.name }, (err, file) => {
        if (err) {
          res.status(400).end();
        }
        console.log("finding the file from the database", req.params.name );
        if (!file) {
          File.findOne({ encodedName: req.params.name }, (err, file) => {
            if (err) {
              res.status(400).end();
            }
            if (!file) {
              res.status(404).end();
              console.log("didn't find the file : " + req.params.name);

            }
            let fileLocation = path.join(__dirname, '..', 'uploads', file.name)
            console.log("found the file", fileLocation);
            
            res.download(fileLocation, (err) => {
              if (err) {
                res.status(400).end();
              }
              console.error("error while res.download");
            })
          })
        }
      })
    },

    deleteFile(req, res, next) {
      console.log("deleting a file", req.params._id);
      File.findOneAndDelete({ id: req.params._id }, (err, file) => {
        if (err) {
          res.status(400).end();
        }
    
        if (!file) {
          res.status(404).end();
        }
        let fileLocation = path.join(__dirname,'..', 'uploads', file.name)
        console.log("found the file while deleting", fileLocation);
    
        fs.unlink(fileLocation, () => {
          File.deleteOne(file, (err) => {
            if (err) {
              return next(err)
            }
            return res.send([])
          })
        })
      })
    },
  }