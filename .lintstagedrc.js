module.exports = {
   '*.{js,jsx,ts,tsx}': (filenames) =>
   `next lint --fix --file ${filenames
     .map((file) => file.split(process.cwd())[1])
     .join(' --file ')}`,
    '*.{js,jsx,ts,tsx,scss,css,md,mdx}': 'prettier --write',
    '*.{js,jsx,ts,tsx,scss,css,md,mdx}': 'git add',
  }
