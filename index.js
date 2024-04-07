const express=require("express");
const fs=require('fs');
const path=require('path');
const app=express();
app.use(express.urlencoded({extended:false}));
let user=false;
app.use(express.static('.'));
app.post("/signup",(req,res)=>{
    fs.readFile(path.join(__dirname ,'./product.json'),"utf-8",(err,data)=>{
        if(err){
            console.log("error1 !");
        }
        else{
            let arr1;
            if(data==""){
                arr1=[];
            }
            else{
                arr1=JSON.parse(data);
            }
            arr1.push(req.body);
            fs.writeFile(path.join(__dirname,'./product.json'),JSON.stringify(arr1),(err)=>{
                if(err){
                    console.log("error2 !");
                }
                else{
                    res.send("registration successfully !");
                }
            })
        }
    })
})

app.post("/getdata",(req,res)=>{
    fs.readFile(path.join(__dirname ,'./product.json'),"utf-8",(err,data)=>{
        if(err){
            console.log("error1 !");
        }
        else{
            let arr1;
            
            
                arr1=JSON.parse(data);
                let flag = false;
    console.log(req.body.password ,req.body.email )
            arr1.forEach(element => {
                if(element.password==req.body.password && element.email==req.body.email){
                  // res.send("welcome"); 
                   res.redirect("./index.html");
                   flag=true;
                }
                
            });
            if(flag==false){
                res.send("plase enter valid Account");

            }
            
        }
    })
})
app.listen(3000,(err)=>{
    if(err){
        console.log('server Not strated !');
    }
    else{
        console.log("server strated !");
    }
})