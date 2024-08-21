export const blockuser=  async(req,res)=>{
    try{
    await db.query("INSERT INTO blocked_gmail(gmail) VALUES ($1)", [
      req.body
      ]);
      res.status(200).json({ message: 'Data received successfully' });
      } catch (err) {
      console.error("Error adding password:", err);
      res.status(500).json({ error: "Failed to add password" });
      }
  }
  export const unblockuser =async(req,res)=>{
    try{
      await db.query("DELETE FROM blocked_gmail WHERE gmail=$1",[req.body.data])
      } catch (err) {
      console.error('Error getting questions:', err);
      res.status(500).json({ error: 'Failed to get questions' });
      }
  }
  //member
  export const membersDetail =async(req,res)=>{
      try {
      const result = await db.query('SELECT * FROM member');
       //console.log(result.rows);
      res.json(result.rows);
      } catch (err) {
      console.error('Error getting questions:', err);
      res.status(500).json({ error: 'Failed to get questions' });
      }
  }
  
  export const addMember= async(req,res)=>{
    //console.log(req.body)
    try{
    await db.query("INSERT INTO member(image,name,role,about,instagram,linkedin,github) VALUES ($1,$2,$3,$4,$5,$6,$7)", [
      req.body.image,
      req.body.name,
      req.body.role,
      req.body.about,
      req.body.instagram,
      req.body.linkedin,
      req.body.github
      ]);
      res.status(200).json({ message: 'Data received successfully' });
      } catch (err) {
      console.error("Error adding password:", err);
      res.status(500).json({ error: "Failed to add password" });
      }
  }