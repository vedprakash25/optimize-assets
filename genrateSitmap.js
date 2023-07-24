// generateSitemap.js
const Sitemap = require("react-router-sitemap").default;
const fs = require("fs-extra");

// Import your React app with React Router configuration
const App = require("../verde-react/");

// Replace "https://example.com" with your actual domain name
const hostname = "https://verdemobility.com";

// Generate the sitemap
const sitemap = new Sitemap(App)
  .filterPaths((path) => !path.includes("404")) // Exclude 404 route if present
  .build(hostname);

// Write the sitemap to a file
fs.writeFileSync("./public/sitemap.xml", sitemap);
