# blog-2026

[Site URL](https://foodpapers.codeberg.page/blog-2026/)

## Introduction
The latest bare bones version of my blog, built by hand with a build script.
This build script gets the files in the `src` folder. It copies over all files in `src/assets` and parses markdown files into html. All these files end up in `_site` which is the folder the "pages" branch is pointed at.

## License
Code in this project is licensed under the MIT license, see [LICENSES/MIT.txt](LICENSES/MIT.txt) for details.
Post content and images are licensed under CC-BY-SA-4.0, see [LICENSES/CC-BY-SA-4.0.txt](LICENSES/CC-BY-SA-4.0.txt) for details.

## How deploy works
Two important branches, Main and Pages. Main is the source code and Pages is the output from the build script. When you run `npm run deploy`, it builds the site and pushes the contents of the _site folder to the Pages branch.

the Pages branch lives in _site as a worktree.

**The deploy script**
```json
"deploy": "npm run build && git -C _site add -A && git -C _site commit -m \"Deploy\" && git -C _site push"
```

`npm run build` runs the build command.
`git -C _site add -A` Operate on the pages worktree and stage everything that's changed there (in _site/).
`git -C _site commit -m \"Deploy\"` Commits the changes and
`git -C _site push` pushes them.

Then the Forgejo webhook runs and renders the pages.