import express,{Request,Response} from 'express';
import AppData from '../../config/dbconfig';
import { Inspection } from '../../entities/inspection';

const router = express.Router();

const inspectionRepo = AppData.getRepository(Inspection);

router.post("/add",async(req:Request, res:Response)=>{
    try {
        const {crop,cropId,sellerId} = req.body;

    if(!crop || !cropId || !sellerId){
        return res.status(201).json({success:false, message:"Fill All Details"})
    }
    const exist = await inspectionRepo.findOne({where:{crop,cropId,sellerId}});
    if(exist){
        return res.status(201).json({message:"Already Requested"})
    }
    const inspection = new Inspection();

    inspection.crop = crop;
    inspection.cropId = cropId;
    inspection.sellerId = sellerId;

    const data = await inspectionRepo.save(inspection);

    res.status(201).json({success:true, message:'Request Added', data})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
})

export default router;