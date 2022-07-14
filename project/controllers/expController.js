const company = require('../models/company');
const experience = require('../models/experience');
const fs = require('fs');
var path = require('path');




const company_index = (req, res) => {
    company.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('companies', { companies: result, title: 'All Companies' });
        })
        .catch(err => {
            console.log(err);
        });
}

const company_experiences = (req, res) => {
    const id = req.params.id;
    experience.find({ company: id }).sort({ createdAt: -1 })
        .then(result => {
            company.findById(id).then(data => {
                // console.log(data);
                res.render('experiences', { experiences: result, data: data.name, title: 'All experiences' });
            })
        })
        .catch(err => {
            console.log(err);
        });

}

const experience_create_post = (req, res, next) => {

    const id = req.params.id;
    // console.log(id);
    const new_experience = {
        name: req.body.name,
        branch: req.body.branch,
        year: req.body.year,
        exp: req.body.exp,
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: 'image/*'
        },
        company: id
    }
    const newExperience = new experience(new_experience);
    newExperience.save()
        .then(result => {
            res.redirect('/companies');
        })
        .catch(err => {
            console.log(err);
        });
}


// const experience_details = (req, res) => {
//     const id = req.params.id;
//     experience.findById(id)
//         .then(result => {
//             res.render('experieceDetails', { experience: result, title: 'Experience Details' });
//         })
//         .catch(err => {
//             console.log(err);
//             // res.render('404', { title: 'Experienot found' });
//         });
// }

module.exports = { company_index, company_experiences, experience_create_post}
