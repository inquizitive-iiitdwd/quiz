import db from "../config.js"
import express from 'express';


export const eventRegistration=async (req,res)=>{
  console.log("got it")
    const {teamLeaderName,teamLeaderId,leadMailId,
     teamName,MemberI ,MemberIid, MemberII, MemberIIid
    } = req.body.data;
 
 
    
    if(!teamLeaderName&&!teamLeaderId&&!leadMailId&&!
     teamName&&!MemberI &&!MemberIid&&! MemberII&&! MemberIIid){
 
        res.status(201).json({ok:false,RteamName:false,RmailID:false,RteamMates:false});
     }
 
    try{
 
      const RteamName = await db.query ('SELECT teamName from eventRegistration where teamName = $1',[teamName]);
      const RmailID= await db.query ('SELECT leadMailID from eventRegistration where leadMailID like $1',[leadMailId]);
     

 
      const Rteamlead = await db.query('SELECT * FROM eventRegistration WHERE memberIid=$1 or memberIIid=$1 or teamleaderId=$1',[teamLeaderId]);
      const RteammateI = await db.query('SELECT * FROM eventRegistration WHERE memberIid=$1 or memberIIid=$1 or teamleaderId=$1',[MemberIid]);
      const RteammateII = await db.query('SELECT * FROM eventRegistration WHERE memberIid=$1 or memberIIid=$1 or teamleaderId=$1',[MemberIIid]);
 

 
      if (RmailID.rows.length>0){
       res.status(201).json({ok:false,RteamName:false,RmailID:true,Rteamlead:false,RteamMates:false});
      }
 
      else if(RteamName.rows.length>0){ 
       res.status(201).json({ok:false,RteamName:true,RmailID:false,Rteamlead:false,RteamMates:false});
     }
      
      else if(Rteamlead.rows.length>0){
       res.status(201).json({ok:false,RteamName:false,RmailID:false,Rteamlead:true,RteamMates:false});
      }
      
      else if(RteammateI.rows.length>0 || RteammateII.rows.length>0){
       res.status(201).json({ok:false,RteamName:false,RmailID:false,Rteamlead:false,RteamMates:true});
      }
      
      else{
 
       
       await db.query(
         'INSERT INTO eventRegistration VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
       ,[teamLeaderName,teamLeaderId,leadMailId,
         teamName,MemberI ,MemberIid, MemberII, MemberIIid]);
       res.status(200).json({ok:true,RteamName:false,RmailID:false,RteamMates:false});
      
      }
     }
 
     catch(e){
       console.log(e);
     }
 
   
 
 };

 export default eventRegistration;


