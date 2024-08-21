import express from 'express';
import { addMember, membersDetail,blockuser,unblockuser} from '../controllers/adminecontroller.js';

const router = express.Router();

router.post("/addMember",addMember);
router.get("/membersDetail",membersDetail);
router.post("/blockuser",blockuser);
router.post("/unblockuser",unblockuser)//use router.delete

export default router;
