const fs = require('fs');
const readline = require('readline');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";
const blogPath = './posts';

const contentFileName = "contents.html";
const templatePath = "./src/templates"
const outPath = "./src/blog";

const blogTemplate = path.join(templatePath, '/blog.html');
const contentsTemplate = path.join(templatePath, '/contents.html');

class PostBuilder {
  constructor(file, data, isHtmlData) {
    const json = isHtmlData ? JSON.parse(data.slice(0, data.indexOf('}') + 1).join("\n")) : {};
    this.fileName = file;
    this.title = isHtmlData ? json.title : file;
    this.date = isHtmlData ? json.date : "";
    this.tags = isHtmlData ? json.tags : "";
    this.htmlFileName = file.replace('.md', '.html');
    this.content = isHtmlData ? data.slice(data.indexOf('}') + 1).join("\n") : data;
    this.isHtmlData = isHtmlData;
  }

  headerContent() {
    // Todo: Create html header
    return this.date;
  }

  postContetAsHtml() {
    return this.isHtmlData ? converter.makeHtml(this.content) : this.content;
  }

  generateHtmlContent() {
    return {
      pageTitle: `${this.title} | Josh Batley - Software Engineer`,
      header: this.headerContent(),
      content: this.postContetAsHtml()
    }
  }
}

(function main() {
  try {
    console.log(BLUE + "Generating Posts");
    const posts = fs.readdirSync(blogPath, { withFileTypes: true })
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => dirent.name)
      .map(mapToFileBulder)
      .map(createPosts);

    createContentsPage(posts);
    console.log(GREEN + "Generated succesfully");
    console.log(GREEN + `=== ${posts.length} posts created ===`);
  } catch (err) {
    console.log(RED + "Failed to folder", err.message);
    return;
  }
})()

function mapToFileBulder(file) {
  try {
    const data = fs.readFileSync(path.join(blogPath, file), 'utf-8').split(/\r?\n/);
    return new PostBuilder(file, data, true);
  } catch (err) {
    console.log(RED + "Failed to read file. File:", file, "Err", err.message);
    return;
  }
}

function createPosts(file) {
  createFileWithReplaceContent(
    blogTemplate,
    file.htmlFileName,
    file.generateHtmlContent(),
  );
  return file;
}

function createContentsPage(posts) {
  var body = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(k => generateLink(k.htmlFileName, k.title))
    .join('\n');

  const contentsPage = new PostBuilder("Contents", body, false);
  createFileWithReplaceContent(contentsTemplate, contentFileName, contentsPage.generateHtmlContent());
}

function createFileWithReplaceContent(template, fileName, content) {
  try {
    let data = fs.readFileSync(template, 'utf8');
    for (const [k, v] of Object.entries(content)) {
      data = data.replace(`{${k}}`, v);
    }

    fs.writeFileSync(path.join(outPath, fileName), data, 'utf8');
    console.log(BLUE + "- File", fileName, "generated succesfully");
  } catch (err) {
    console.log(RED + "Blog post was not created. File:", file, " Error:", err.message);
    return;
  }
};

function generateLink(link, title) {
  return `<li><a class="blog-link" href="${link}">${title}</a></li>`
}
