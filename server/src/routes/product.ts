import { Router, Request, Response, } from "express";
import { ProductModel } from "../models/product";
import { verifyToken } from "./user";

const router = Router()

router.get("/", verifyToken, async(_, res: Response, ) => {
    try {
    const products = await ProductModel.find({})
    res.json({products})
    }catch (err) {
        res.status(400).json({ err });
     }
}) ;
router.post ("/checkout", verifyToken, async (req: Request, res: Response) => {

})


export { router as productRouter };