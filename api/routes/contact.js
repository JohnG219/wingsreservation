import express, { application } from "express";
import {
  createcontact,
  getcontact,
  deletecontact,
} from "../controllers/contact.js";

const router = express.Router();

router.put("/create", createcontact);

router.delete("/:id", deletecontact);

router.get("/", getcontact);

export default router