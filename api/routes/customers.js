import express, { application } from "express";
import { createcustomers, getcustomers, deletecustomers } from "../controllers/customers.js";


const router=express.Router();

router.put("/create",createcustomers)

router.delete("/:id", deletecustomers);

router.get("/",getcustomers);

export default router