## Initial setup:

To get started developing for this repo, you'll want to get familiarized with this gulp-based Static Site Generation so you can push compiled code:

Install VS Code, the Live Server extension, git, and node Current

Clone this repository

Run "npm install" in the root directory

Run "npm install --global gulp" for VS Code's sake

Run "gulp"

Now you should have a production ready "docs" directory

## Using the environment

### New Pages

Follow the example index.pug:

Extend the layout template with a new file in "src/html/pages" or a further subdirectory

.html files are generated under "docs" matching the above directory structure

### New Scripts and Styles

SCSS files directly under src/css will generate CSS files in docs/css

src/css/modules holds styles that are only meant to be included in other files

JS files directly under src/js will generate minified files in docs/js

### Live Editing

Set liveServer.settings.root to "/docs" in VS Code's settings.json and restart VS Code

Run "gulp watch" and open "docs/index.html" with live server

Edits to the Pug, SASS, and JS files in "src" are seen by "gulp watch" which triggers any relevant gulp tasks.  Live Server sees the resulting changes to the "docs" directory and reloads the browser

See something in the output you don't like?  The gulp tasks generate sourcemaps for CSS and JS, so you can follow the chain back and see where a rule or script came from

### Hosting

docs folder is left out of gitignore to enable hosting the site quickly in GitHub Pages, so make sure to gulp before committing

When referencing internal links, use true relative paths without "/" at the beginning for the paths to work in Github Pages
