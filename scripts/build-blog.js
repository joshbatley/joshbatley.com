const fs = require('fs');
const readline = require('readline');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const blogPath = './posts';
const contentFileName = "contents.html";
const templatePath = "./src/templates"
const blogTemplate = path.join(templatePath, '/blog.html');
const contentsTemplate = path.join(templatePath, '/contents.html');
const outPath = "./src/blog";

class PostBuilder {
  constructor(file, data) {
    const json = JSON.parse(data.slice(0, data.indexOf('}') + 1).join("\n"));
    this.fileName = file;
    this.title = json.title;
    this.date = json.date;
    this.tags = json.tags;
    this.htmlFileName = file.replace('.md', '.html');
    this.content = data.slice(data.indexOf('}') + 1).join("\n");
  }

  headerContent() {
    // Todo: Create html header
    return this.date;
  }

  postContetAsHtml() {
    return converter.makeHtml(this.content);
  }

  generateHtmlContent() {
    return {
      header: this.headerContent(),
      content: this.postContetAsHtml()
    }
  }
}

function mapToFileBulder(file) {
  const lines = fs.readFileSync(path.join(blogPath, file), 'utf-8').split(/\r?\n/);
  return new PostBuilder(file, lines);
}

function createPosts(file) {
  createFileWithReplaceContent(
    blogTemplate,
    file.htmlFileName,
    file.generateHtmlContent(),
  );
  return file;
}

function createFileWithReplaceContent(template, fileName, content) {
  let data = fs.readFileSync(template, 'utf8');
  for (const [k, v] of Object.entries(content)) {
    data = data.replace(`{${k}}`, v);
  }

  fs.writeFileSync(path.join(outPath, fileName), data, 'utf8');
  console.log("File has been created with the replacement.");
};


function createLink(link, title) {
  return `<a class="blog-link" href="/blog/${link}">${title}</a>`
}


function createContentsPage(posts) {
  var content = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(k => createLink(k.htmlFileName, k.title))
    .join('\n')
  createFileWithReplaceContent(contentsTemplate, contentFileName, { content: content });
}

(function main() {
  const posts = fs.readdirSync(blogPath, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
    .map(mapToFileBulder)
    .map(createPosts);

  createContentsPage(posts);
})()


