const express=require('express');
const admincontroller = require('../controllers/admincontroller');
const route=express();
const studentmodel =require('../models/student-model');
const authMiddleware=require('../middleware/authMiddleware');
const malter = require('../middleware/malter.js');
const blogModel= require('../models/blog-model.js');
route.get('/Add_blogs',(req,res)=>{
    res.render('Add_blogs',{title:"Home page"});
})

route.get('/forgetpass',(req,res)=>{
    res.render('forgetpass');
})
route.get('/otp',(req,res)=>{
    res.render('otp')
})
route.get('/viewdata', async(req,res)=>{
    let blogs = await blogModel.find({}); // Fetch blogs instead of students
    console.log(blogs);
    res.render('viewdata',{blogs}); // Pass blogs to the viewdata template
})

route.post('/studentform',admincontroller.studentform)
route.get('/deletestd/:id',async (req,res)=>{
    let{id}=req.params;
    await studentmodel.deleteOne({_id:id});
    console.log(id);
    res.redirect('/viewdata');
})

route.get('/editstd/:id',async(req,res)=>{
    let { id }=req.params;
    let singlerecord= await studentmodel.findById(id);
    console.log("singlerecord",singlerecord);    
    res.render('edit',{singlerecord});
})



route.get('/',authMiddleware,admincontroller.defultcontroller);


route.get('/login',(req,res)=>{
    res.render('login');
})
route.get('/sigup',(req,res)=>{
    res.render('sigup');
})

route.get('/profile',admincontroller.profilroute);
route.post('/fogetpassword',admincontroller.forgetpass)
route.post('/login', admincontroller.logincontroller);
route.post('/signupform',admincontroller.signupcontroller);
route.post('/logout',authMiddleware,admincontroller.logoutController);
route.post('/otpp',admincontroller.otp);
route.get('/chengpass',admincontroller.chengpass);
route.post('/chengpasword',admincontroller.chengpasword);
route.post('/blogdetail', malter.single('avatar'), admincontroller.blogdetailadd);
route.get('/deleteblog/:id',admincontroller.deletcontroller);
route.get('/editblog/:id',admincontroller.editcontroller);
// route.get('/viewdata', admincontroller.viewcontroller);
route.get('/viewdata', admincontroller.viewcontroller);
route.get('/type',(req,res)=>{
    res.render('type')
})
module.exports=route;
