const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function compressWebPImage(filePath) {
  const fileExtension = path.extname(filePath).toLowerCase();

  if (fileExtension === ".webp") {
    const fileName = path.parse(filePath).name;
    const outputFilePath = path.join(
      path.dirname(filePath),
      `${fileName}-c.webp`
    );

    sharp(filePath)
      .webp({ quality: 70 }) // You can adjust the compression quality (0-100) as needed
      .toFile(outputFilePath, (error) => {
        if (error) {
          console.error("Error compressing file:", filePath);
        } else {
          console.log("File compressed:", filePath);
          // Remove the original WebP image file (Optional, you can comment this line if you want to keep the originals)
          fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) {
              console.error("Error removing file:", filePath);
            } else {
              console.log("Original file removed:", filePath);
            }
          });
        }
      });
  }
}

function processFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error("Error retrieving file information:", error);
          return;
        }

        if (stat.isFile()) {
          compressWebPImage(filePath);
        } else if (stat.isDirectory()) {
          processFolder(filePath);
        }
      });
    });
  });
}

// Usage example:
const rootFolder = "assets";
processFolder(rootFolder);
