const fs = require('fs');
const path = require('path');

const blogPath = './posts';
const args = process.argv.slice(2);

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";

(function main() {
  const title = getTitle();
  createFile(generateFileName(title), title);
})();

function getTitle() {
  let title = args.slice(args.indexOf("--title") + 1).join(" ");
  if (stringIsEmpty(title)) {
    console.error(RED + 'Error: The --name argument is required.');
    return;
  }
  return title.toString();
}

function stringIsEmpty(str) {
  return str.trim() === "" || !str || str.length <= 0
}

function generateFileName(str) {
  return `${generateDate()}-${str.replace(/\s+/g, "-")}.md`;
}

function generateDate() {
  return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
}

function createFile(file, title) {
  const filePath = path.join(blogPath, file);

  try {
    console.log(BLUE + "Creating new blog post");
    if (fs.existsSync(filePath)) {
      throw new Error("File already exists")
    }
    fs.writeFileSync(filePath, generateContent(title));
    console.log(GREEN + "New post created:", file)
  } catch (err) {
    console.error(RED + "Failed to write file:", file);
    console.error(RED + "Err:", err.message);
  }
}

function generateContent(title) {
  return `{
  "title": "${capitalizeWords(title)}",
  "date": "${generateDate()}",
  "tags": []
}

#  ${capitalizeWords(title)}

`;
}

function capitalizeWords(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}
