const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

function convertFilesToWebP(directoryPath) {
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
            const fileWithoutExtension = path.parse(file).name;
            const outputFile = path.join(
              directoryPath,
              `${fileWithoutExtension}.webp`
            );

            // Convert the file to WebP
            const command = `cwebp -quiet "${filePath}" -o "${outputFile}"`;

            exec(command, (execError) => {
              if (execError) {
                console.error("Error converting file:", execError);
              } else {
                console.log("File converted:", outputFile);
              }
            });
          }
        } else if (stat.isDirectory()) {
          // Recursively convert files in subdirectories
          convertFilesToWebP(filePath);
        }
      });
    });
  });
}

// Usage example:
const rootDirectory = "assets";
convertFilesToWebP(rootDirectory);
