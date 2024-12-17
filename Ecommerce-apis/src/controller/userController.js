const userServices = require("../services/user_services");


const getUserProfile = async(req,res)=>{
try{
  const jwt = await req.headers.authorization?.split(" ")[1];
  console.log(jwt);
  if (!jwt) {
    return res.status(404).send({ error: "token not found" });
  }
  const user = await userServices.getUserProfileByToken(jwt);

  // my
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjcxZDZlNDNjNjdiNjg3OTVlOTYxNWQiLCJpYXQiOjE3MTg4NTk5MzMsImV4cCI6MTcxOTAzMjczM30.ENxdLUCF5cr6mXKj2AfV0Pga_LmGUJYLBGMDNQDFAuw

  //   receiverd
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjcxZDZlNDNjNjdiNjg3OTVlOTYxNWQiLCJpYXQiOjE3MTg4NTk5MzMsImV4cCI6MTcxOTAzMjczM30.ENxdLUCF5cr6mXKj2AfV0Pga_LmGUJYLBGMDNQDFAuw"

  console.log(user);

  return res.status(200).send(user);
}catch(error){
 return res.status(500).send(error.message);  
}
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await userServices.getAllUsers();

       return res.status(200).send(users);
    } catch (error) {
       return res.status(500).send(error.message);   
    }
}

module.exports = {getAllUsers,getUserProfile}