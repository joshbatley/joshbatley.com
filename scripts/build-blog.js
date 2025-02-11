const fs = require('fs');
const readline = require('readline');
const path = require('path');
const showdown = require('showdown');

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";

const blogPath = './posts';
const contentFileName = "contents.html";
const templatePath = "./src/templates"
const outPath = "./src/blog";
const baseUrl = "https://joshbatley.com/";
const pageTitleBase = '| Josh Batley - Software Engineer';

const blogTemplate = path.join(templatePath, '/blog.html');
const contentsTemplate = path.join(templatePath, '/contents.html');
const converter = new showdown.Converter();

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
      pageTitle: `${this.title} ${pageTitleBase}`,
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
    console.log(GREEN + "Generated posts succesfully");
    console.log(GREEN + `=== ${posts.length} posts created ===`);

    console.log(BLUE + "Generating sitemaps")
    createSitemap(posts);
    console.log(GREEN + "Generated sitemap succesfully");
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

function createSitemap(posts) {
  try {
    fs.writeFileSync("_site/sitemap.xml", generateXml(posts), 'utf8');
  } catch (err) {
    console.log(err);
  }
}

function generateXml(posts) {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${generateStaticUrlsSitemap()}
  ${generateUrlSitemap(posts)}
</urlset>`;
}

function generateStaticUrlsSitemap() {
  return `<url>
    <loc>${baseUrl}</loc>
    <lastmod>${generateDate()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}blog/contents</loc>
    <lastmod>${generateDate()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
}

function generateUrlSitemap(posts) {
  return posts.map(p => `<url>
    <loc>${baseUrl}blog/${p.htmlFileName.replace(".html", "")}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join("\n  ");
}

function generateDate() {
  return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
}
