const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const expRoutes = require('./routes/expRoutes');
const adminRoute = require('./routes/adminroute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
// const { RESOURCES_INITIALIZE } = require('admin-bro');
// const User = require('./models/User');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/admin', adminRoute);
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://anuraag:firstblood@cluster0.ekudz.mongodb.net/cluster0?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/topics', requireAuth);
app.use('/topics',topicRoutes);
app.get('/companies', requireAuth);
app.use('/companies',expRoutes);
// // 404 page
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
// });

app.use(authRoutes);




