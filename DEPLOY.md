🚀 Deploying Webpack Project to GitHub Pages from Main Branch

This guide walks you through deploying a Webpack project to GitHub Pages using the main branch and the /dist folder.

🛠️ Webpack Configuration

Ensure your webpack.common.js includes the following:

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './src/index.js',
output: {
filename: '[name].bundle.js',
path: path.resolve(\_\_dirname, 'dist'),
clean: true,
publicPath: './', // Ensures correct paths on GitHub Pages
},
plugins: [
new HtmlWebpackPlugin({
template: './src/template.html',
filename: 'index.html',
}),
],
module: {
rules: [
{
test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
type: 'asset/resource',
},
],
},
};

📦 Build the Project

npm run build

This will output your site into the dist/ directory.

🐙 Push to GitHub

git add .
git commit -m "Build project for deployment"
git push origin main

⚙️ GitHub Pages Configuration

Go to your repository on GitHub.

Navigate to Settings → Pages.

Under Source:

Branch: main

Folder: /dist

Click Save.

GitHub will now serve the site using the index.html in your dist/ folder.

OR Use the gh-pages method with branching.

🌍 Access Your Live Site

https://<your-username>.github.io/<repo-name>/

✅ Summary Script

npm run build

git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

Then configure GitHub Pages to serve from main /dist in your repo settings.

✅ Optional: Add This File

Save this as DEPLOY.md in your repo to keep a permanent reference.
