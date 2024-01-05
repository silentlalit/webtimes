import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export const uploadImage = async (basepath: string, file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  await writeFile(path.join(process.cwd(), basepath + filename), buffer);

  return filename;
};

export const deleteImage = (basepath: string, filename: string) => {
  const filePath = `${basepath + filename}`;
  fs.unlink(filePath, (err) => {
    if (err) console.log("Error deleting file");
    else console.log("File deleted successfully");
  });
};
