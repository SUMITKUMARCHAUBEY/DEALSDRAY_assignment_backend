const express=require('express');
const router=express.Router();
router.use(express.json());
const {body,validationResult}= require('express-validator');
const Employee= require('../madel/employee')
router.get('/',async(req,res)=>{
    const emp = await Employee.find();
    res.status(200).json(emp);
})
router.post('/add', [
    body('email','enter a valid email').isEmail(),
    body('name','password must be 5 char long').isLength({min:5}),
    body('mobile','mobile must be 10 char long').isLength({min:10}),
     body('mobile','mobile must be 10 char long').isLength({max:10})
    ],async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let success=false
            return res.status(400).json({success,errors:errors.array()})
        }
        const email=req.body.email;
        const pass=req.body.pass;
        const emp=await Employee.findOne({email:email})
        if(emp){
            let success=false;
            res.json({success,data:'user already exist'});

        }
        else{
          
            const newemp= new Employee({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                designation:req.body.designation,
                gender:req.body.gender,
                course:req.body.course
            })
            newemp.save()
            .then(emp=>{
                let success=true
                console.log(('user created'));
                res.json({success,data:'employee created'})
            })
            .catch(err=>{
                let success=false;
                console.log(err);
                res.json({success,data:err})
            })
        }
})
router.put('/edit',[
    body('email','enter a valid email').isEmail(),
    body('name','password must be 5 char long').isLength({min:5}),
    body('mobile','mobile must be 10 char long').isLength({min:10}),
     body('mobile','mobile must be 10 char long').isLength({max:10})
    ],async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let success=false
            return res.status(400).json({success,errors:errors.array()})
        }
        const email=req.body.email;
        const updatedEmployee = await Employee.findOneAndUpdate({ email: email }, {
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            designation:req.body.designation,
            gender:req.body.gender,
            course:req.body.course
        }, { new: true })
        .then(emp=>{
            res.status(200).json(emp);
          })
          .catch(err=>{
            console.log(err);
            res.send('please select the note you want to update')
          })
})
router.get('/empbyId/:id', async(req, res) => {
    const id = req.params.id;
    console.log(`Requested ID: ${id}`);
   const emp=await Employee.findOne({email:id})
   .then((emp)=>{
    res.status(200).json(emp);
   })
   .catch((e)=>{
    res.status(404).json(e);
   })
   
});
router.delete('/deletebyId/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const deletedEmployee = await Employee.findOneAndDelete({ email: id })
   .then((emp)=>{
    res.status(200).json("Success");
   })
   .catch((e)=>{
    res.status(404).json(e);
   })
})
module.exports=router;