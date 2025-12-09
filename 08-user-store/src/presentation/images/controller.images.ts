import { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
export class ImagesController {
  public async getImages(req: Request, res: Response) {
    const { type = "", img = "" } = req.params;
    const imagePath: string = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );
    console.debug({ imagePath });

    if (!fs.existsSync(imagePath)) res.status(404).send("Image not found");

    res.sendFile(imagePath);
  }
}
