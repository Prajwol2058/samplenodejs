const abcd = (req,res,next)=>{
    console.log("This is a middleware");
    next();
}

module.exports = { abcd }