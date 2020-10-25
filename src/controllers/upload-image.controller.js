var formidable = require('formidable');
var fs = require('fs');

exports.uploadFile = (req) => {
    console.log('upload');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './assets/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            // res.write('File uploaded and moved!');
            console.log('Success.');
        });
    });
    let data = {};
    res.send({ message: 'user was created successfully!', data });
};

// exports.create = (req, res) => {
//     // validate request
//     if (!req.body)
//         res.status(400).send({ message: 'Content can not be empty!' });

//     UploadImage.uploadFile(req.file);
//     // create new user
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password,
//         img: req.body.img,
//         name_lastname: req.body.name_lastname,
//         student_id: req.body.student_id,
//         faculty: req.body.faculty,
//         branch: req.body.branch,
//         email: req.body.email,
//         tel: req.body.tel,
//     });
//     res.send({ message: 'user was created successfully!', data });
// };
