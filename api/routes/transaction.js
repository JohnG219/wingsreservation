import express, { application } from "express";
import {
  createtransaction,
  gettransaction,
  deletetransaction,
} from "../controllers/transaction.js";


const router=express.Router();

router.put("/create", createtransaction);

router.delete("/:id", deletetransaction);

router.get("/", gettransaction);

export default router