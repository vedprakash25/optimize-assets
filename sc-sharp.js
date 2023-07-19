const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function convertToWebP(filePath, outputDir) {
  const fileExtension = path.extname(filePath).toLowerCase();
  const fileName = path.parse(filePath).name;
  const outputFile = path.join(outputDir, `${fileName}.webp`);

  sharp(filePath)
    .toFormat("webp")
    .toFile(outputFile, (err) => {
      if (err) {
        console.error("Error converting file:", filePath);
      } else {
        console.log("File converted:", filePath);
      }
    });
}

function convertFolderToWebP(directoryPath, outputDir) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error("Error retrieving file information:", error);
          return;
        }

        if (stat.isFile()) {
          const fileExtension = path.extname(file).toLowerCase();
          if (
            fileExtension === ".png" ||
            fileExtension === ".jpg" ||
            fileExtension === ".jpeg"
          ) {
            convertToWebP(filePath, outputDir);
          }
        } else if (stat.isDirectory()) {
          const subfolderOutputDir = path.join(outputDir, file);
          fs.mkdir(subfolderOutputDir, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
              console.error("Error creating subfolder:", mkdirErr);
            } else {
              convertFolderToWebP(filePath, subfolderOutputDir);
            }
          });
        }
      });
    });
  });
}

// Specify the input folder path and the output folder path
const inputFolder = "assets";
const outputFolder = "output";

// Call the function to convert the images
convertFolderToWebP(inputFolder, outputFolder);
