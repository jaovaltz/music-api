import {
  getMusics,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
} from "../controllers/music.controller";

import { Router } from "express";

const router = Router();

router.get("/", getMusics);
router.get("/:id", getMusicById);

router.post("/", createMusic);
router.put("/:id", updateMusic);
router.delete("/:id", deleteMusic);

export default router;
