## Initial setup:

Install VS Code, the Live Server extension, git, and node LTS

Clone this repository: "git clone https://github.com/TiKevin83/VSCodeWebSandbox.git"

Run "npm install" in the root directory

Run "npm install --global gulp" for VS Code's sake

Run "gulp"

Now you should have a production ready "dist" directory

## Using the environment

### New Pages

Follow the example index.pug:

Extend the layout template with a new file in "src/html/pages" or a further subdirectory

.html files are generated under "dist" matching the above directory structure

### New Scripts and Styles

SCSS files directly under src/css will generate CSS files in dist/css

src/css/modules holds styles that are only meant to be included in other files

Typescript is pulled from src/js/main.ts into a single bundle for the browser in dist/js/bundle.js

src/js/includes holds local scripts that main.ts can import.  Browserify/tsify bundles those imports along with npm modules for use in the browser

### Live Editing

Set liveServer.settings.root to "/dist" in VS Code's settings.json and restart VS Code

Run "gulp watch" and open "dist/index.html" with live server

Edits to the Pug, SASS, and TypeScript files in "src" are seen by "gulp watch" which triggers any relevant gulp tasks.  Live Server sees the resulting changes to the "dist" directory and reloads the browser

See something in the output you don't like?  The gulp tasks generate sourcemaps for CSS and JS, so you can follow the chain back and see where a rule or script came from

### Hosting

dist is included in commits to enable hosting the site quickly in GitHub Pages:

"git subtree push --prefix dist origin gh-pages"

When referencing internal links, use true relative paths without "/" at the beginning for the paths to work in Github Pages
