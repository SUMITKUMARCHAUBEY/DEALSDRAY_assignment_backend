const express=require('express');

const router=express.Router();
router.use(express.json());
const User=require('../madel/user')
const {body,validationResult}= require('express-validator');
var bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken");

router.post('/login',
    [body('name','enter a valid email').isEmail(),
    body('pass','password must be 5 char long').isLength({min:5})]
    ,async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let success=false
            return res.status(400).json({success,errors:errors.array()})
        }
        const email=req.body.name;
        const pass=req.body.pass;
        const user=await User.findOne({email:email})
        if(user){
            bcrypt.compare(pass,user.password,(err,result)=>{
                // console.log(err);
                if(result){
                    
                    const token=jwt.sign({id:user._id},"sumit");
                    
                    res.setHeader('Cookie-Setup',[`dealsLogin=${token}`]);
                    // res.json('Cookie-Setup',[`inoteLogin=${token}`]);
                    res.json({success:true,data:token,email:user.email});
                    
    
                }
                else{
                    res.status(400).json('invalid credencials');
                    
                }
            })
        } 
        else{
            res.status(400).json('invalid credencials')
        }
})



router.post('/signup',
    [body('name','enter a valid email').isEmail(),
    body('pass','password must be 5 char long').isLength({min:5})]
    ,async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let success=false
            return res.status(400).json({success,errors:errors.array()})
        }
    const email=req.body.name;
    const pass=req.body.pass;
        // console.log(name,email,pass);
      let user=await User.findOne({email:email})
        
            if(user){
                let success=false;
                res.json({success,data:'user already exist'});
    
            }
            else{
                const salt=await bcrypt.genSalt(10);
                const hash=await bcrypt.hash(pass,salt);
                const newuser= new User({
                    email:email,password:hash
                })
                newuser.save()
                .then(user=>{
                    let success=true
                    console.log(('user created'));
                    res.json({success,data:'user created'})
                })
                .catch(err=>{
                    let success=false;
                    console.log(err);
                    res.json({success,data:err})
                })
            }
})

router.get("/logout",(req,res)=>{
 res.cookie('inoteLogin','',{maxAge:1})
 res.send('you are logged out successfully'); 
})

module.exports=router;