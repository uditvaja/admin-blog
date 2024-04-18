const bcrypt = require('bcrypt');
const Adminmodel = require('../models/admin-model');
const blogModel = require('../models/blog-model');
const nodemailer =require('nodemailer');
const otpGenerator = require('otp-generator');
const studentmodel =require('../models/student-model');
const session = require('express-session');
const passport = require('passport');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: 'vajaudit91@gmail.com',
        pass: 'cxozunsvhkrofsks',
    }
});

const defultcontroller = (req,res)=>{
    const {session} = req.body;
    res.render('index', { successMessage: req.flash('success') });
    
}
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt with email:', email);

        const admin = await Adminmodel.findOne({ email });

        console.log('User found:', admin);
        if (!admin) {
            console.log('User not found');
            req.flash('error', 'Incorrect email or password');
            res.redirect('/login');
            return;
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            console.log('Incorrect password');
            req.flash('error', 'Incorrect email or password');
            res.redirect('/login');
            return;
        }

        console.log('Login successful');
        req.session.user = admin;
        req.user = admin; 
        console.log('Stored user:', admin); 
        
        req.flash('success', 'Login successful!');
        res.redirect("/");
             
    } catch (error) {
        console.log("Error", error);
        res.redirect('/login');
    }
};

const profilroute =async(req,res)=>{
    const user = req.session.user;
    
    if (user) {
        res.render('profile', { user: user });
    } else {
        console.log('User data not found');
        req.flash('error', 'User data not found');
        res.redirect('/login');
    }
}


const studentform =async(req,res)=>{
    let {editid} =req.body;
    if(!editid){
        let student= new studentmodel({
            fname:req.body.fname,
            lname:req.body.lname,
            number:req.body.number,
            email:req.body.email, 
        })
        student.save();
    }else{
        let updatebook = await studentmodel.updateOne({_id:editid},{
            fname:req.body.fname,
            lname:req.body.lname,
            number:req.body.number,
            email:req.body.email, 
        })
        console.log("updated success",updatebook);
    }
    res.redirect('/viewdata');

}

const signupcontroller = async (req, res) => {
    try {
        const { username, password, confompassword, email } = req.body;
        if (password !== confompassword) {
            console.log("Passwords do not match");
                  return;   
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Adminmodel({
            username: username,
            password: hashedPassword,
            email: email,
        });
        await admin.save();
        console.log("Admin added successfully:", admin);
        res.redirect("/login");
    } catch (error) {
        console.log("Error ", error);
       res.redirect("sigup")
    }
};




const logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.clearCookie('user');
        res.redirect('/login');
    });
};
const fogetpassword = (req, res) => {
    try {
        res.render('forgetpass')
    } catch (err) {
        console.log(err);
    }
}

const forgetpass = async(req,res)=>{
    let email = req.body.email;
    var user = await Adminmodel.findOne({ "email": email }).then((user) => {
        const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });


        const mailOptions = {
            from: 'vajaudit91@gmail.com',
            to: user.email,
            subject: 'Node.js',
            text: `do not share your otp to other ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        console.log("OTP", otp);
        // res.cookie('otp', otp);
        req.session.otp = otp;
        req.session.userId = user.id;
        // res.cookie('Id',user.id);
        res.redirect('/otp');
    }).catch(() => {
        console.log("User Not Found");
    })
}
const otp = (req,res) =>{
    // let { otp } = req.cookies;
    const savedOtp = req.session.otp;
    const userOtp = req.body.otp;
    // const savedOtp = req.cookies.otp;
    console.log(savedOtp);
    // let userOtp  = req.body.otp;
    try {
        if (savedOtp == userOtp) {
            res.redirect("/chengpass");
            console.log('Otp match');
        }
    } catch (err) {
        console.log(err);
    }

}
const chengpass=(req,res)=>{
    res.render('chengpass')
}

const chengpasword=async(req,res)=>{
    try {
        const userId = req.session.userId;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/chengpass');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 
        const updatedAdmin = await Adminmodel.findByIdAndUpdate(userId, {
            password: hashedPassword
        });

        if (!updatedAdmin) {
            req.flash('error', 'Failed to update password');
            return res.redirect('/chengpass');
        }
        delete req.session.userId;

        req.flash('success', 'Password updated successfully');
        res.redirect('/login'); 

    } catch (error) {
        console.log("Error updating password:", error);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/chengpass');
    }
}

const blogdetailadd = async(req, res) => {
    try {
        let { editid } = req.body;
        let avatar = req.file ? req.file.filename : null; 
        console.log(req.file);
        if (!editid) {
            let blog = new blogModel({
                blog: req.body.blog,
                title: req.body.title,
                type: req.body.type,
                avatar: avatar
            });

            await blog.save();
            console.log("Blog added successfully");
        } else {
            let updateblog = await blogModel.updateOne({ _id: editid }, {
                blog: req.body.blog,
                title: req.body.title,
                type: req.body.type,
                avatar: avatar 
            });

            console.log("Blog updated successfully", updateblog);
        }
        res.redirect('/viewdata'); 
    } catch (error) {
        console.error("Error adding/updating blog:", error);
        req.flash('error', 'Failed to add/update blog');
        res.redirect('/viewdata'); 
    }
};

const viewcontroller = async (req, res) => {
    try {
        let blogs = await blogModel.find({});
        console.log("Fetched blogs:", blogs); 
        res.render('viewdata', { blogs: blogs }); 
    } catch (error) {
        console.error("Error fetching blogs:", error);
        req.flash('error', 'Failed to fetch blogs');
        res.render('viewdata', { blogs: [] });
    }
};

const deletcontroller = async(req, res) => {
    try {
        let { id } = req.params;
        await blogModel.deleteOne({ _id: id });
        console.log("Blog deleted successfully");
        res.redirect('/viewdata'); 
    } catch (error) {
        console.error("Error deleting blog:", error);
        req.flash('error', 'Failed to delete blog');
        res.redirect('/viewdata'); 
    }
};

const editcontroller = async (req, res) => {
    try {
        let { id } = req.params;
        let singlerecord = await blogModel.findById(id);
        console.log("singlerecord", singlerecord);
        res.render('edit', { singlerecord });
    } catch (error) {
        console.error("Error fetching blog for editing:", error);
        req.flash('error', 'Failed to fetch blog for editing');
        res.redirect('/viewdata'); 
    }
};


module.exports={defultcontroller,logincontroller,signupcontroller,logoutController,profilroute,forgetpass,fogetpassword,otp,studentform,chengpass,chengpasword,blogdetailadd,deletcontroller,editcontroller,viewcontroller};
