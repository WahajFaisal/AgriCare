import express, { Request, Response } from "express";
import { Blog } from "../../entities/blog";
import AppData from "../../config/dbconfig";
const blogRepo = AppData.getRepository(Blog);

const router = express.Router();

router.get("/allBlog", async (req: Request, res: Response) => {
  try {
    const allBlogs = await blogRepo.find();
    res.status(201).json({ data: allBlogs });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/addBlog", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  let blog = await blogRepo.create({ title, blog: content });
  await blogRepo.save(blog);
  res.status(201).json({ message: "Added" });
});

router.get("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await blogRepo.delete({ id: id });
    res.status(201).json({ message: "Success" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.toString(),
    });
  }
});

export default router;
