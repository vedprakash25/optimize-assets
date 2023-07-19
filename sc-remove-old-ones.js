const fs = require("fs");
const path = require("path");

function deleteFiles(directoryPath) {
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
            fs.unlink(filePath, (unlinkError) => {
              if (unlinkError) {
                console.error("Error deleting file:", filePath, unlinkError);
              } else {
                console.log("File deleted:", filePath);
              }
            });
          }
        } else if (stat.isDirectory()) {
          deleteFiles(filePath);
        }
      });
    });
  });
}

// Usage example:
const directoryPath = "assets";
deleteFiles(directoryPath);
