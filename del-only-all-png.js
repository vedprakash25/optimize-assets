const fs = require("fs");
const path = require("path");

function deleteFilesWithExtensions(directoryPath, extensions) {
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
          if (extensions.includes(fileExtension)) {
            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting file:", filePath);
              } else {
                console.log("File deleted:", filePath);
              }
            });
          }
        } else if (stat.isDirectory()) {
          deleteFilesWithExtensions(filePath, extensions);
        }
      });
    });
  });
}

// Usage example:
const directoryPath = "assets";
const extensionsToDelete = [".png", ".jpg"];

deleteFilesWithExtensions(directoryPath, extensionsToDelete);
