const check = (req,res,next)=>{
    if(req.body.lastTradedPrice<1000){
        console.log("price not enough");
        res.send("failed")

    }
    else{
        console.log("price enough")
        next();

    }
}

module.exports = { check }