{
  "title": "Testing More Then One Aa",
  "date": "2025-02-11",
  "tags": ["code", "design", "hello world"]
}

#  Testing More Then One Aa

{meta}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra magna dui, at tincidunt nisl ultrices nec. Mauris ut arcu quis orci commodo congue. Donec volutpat mattis vulputate. Proin a vulputate justo. Praesent sodales nulla dignissim ante ornare, cursus ornare neque feugiat. Donec nibh lacus, malesuada ut mattis vel, porta sed neque. Maecenas fringilla velit et eros consequat, in [tincidunt](https://www.checkout.com) lorem maximus. Nulla ultrices blandit venenatis.



Suspendisse molestie feugiat lorem venenatis elementum. Vivamus id consectetur libero. Aliquam hendrerit faucibus urna, eget maximus nibh accumsan eu. Nam laoreet enim non risus bibendum, eget egestas sem fermentum. Pellentesque eu laoreet nisi. Quisque eleifend elit sed ante pellentesque, in lacinia nisi euismod. Proin libero eros, pellentesque eu sapien ut, dapibus convallis diam. Quisque luctus justo eget turpis dapibus venenatis. Vivamus accumsan urna non tristique aliquam. Morbi cursus libero ac tellus bibendum, et tincidunt est consectetur. Integer sed felis turpis. Praesent blandit fermentum placerat. Aliquam imperdiet semper dictum.

![alt text](/src/assets/post-images/waterfall.jpg "Title")

Pellentesque mauris urna, facilisis sit amet rutrum a, varius at lacus. Aliquam erat volutpat. Morbi quam odio, faucibus vel dolor ac, aliquet finibus orci. Suspendisse elementum risus at sapien lacinia rutrum. Integer quam dolor, auctor a dapibus id, malesuada non tortor. Quisque vestibulum et dolor ut convallis. Pellentesque mattis pretium felis. Praesent venenatis pulvinar feugiat. Duis varius maximus nisi, id viverra leo. Morbi condimentum quis massa ac feugiat. Praesent ut ligula accumsan, ultricies libero non, vestibulum ipsum.

### heading 3

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent eget justo a nibh maximus placerat. Vivamus quis risus vulputate, bibendum mi eget, luctus ligula. Nunc porttitor efficitur enim ut viverra. Morbi blandit, erat in interdum egestas, ligula ligula commodo ligula, vitae placerat augue lorem sed arcu. Aenean eu dictum purus. Integer blandit rhoncus massa, nec rhoncus arcu consectetur pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras fermentum sodales quam id varius. Nam fringilla nec orci sed faucibus. Suspendisse gravida risus quis rhoncus porttitor. Pellentesque ornare efficitur quam, et ultricies lectus dictum ut.

Fusce eget urna quis purus rhoncus blandit. Sed cursus convallis ipsum, et dictum purus efficitur eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque viverra et magna et imperdiet. Duis ac mollis augue. Suspendisse quis enim neque. Praesent porttitor dolor in velit tempor suscipit. Vestibulum nibh purus, vehicula eget purus sit amet, tempor dictum elit. Proin pharetra quam sit amet erat porttitor consequat. Nulla sodales libero id neque blandit pharetra. Cras ullamcorper nisl aliquet aliquam egestas. Nulla quis dolor eros. Vivamus euismod sagittis lectus a sodales. Nam viverra feugiat convallis. Nullam vel erat suscipit ipsum posuere pellentesque. Nunc vehicula elit non mauris gravida sodales.


##### heading 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra magna dui, at tincidunt nisl ultrices nec. Mauris ut arcu quis orci commodo congue. Donec volutpat mattis vulputate. Proin a vulputate justo. Praesent sodales nulla dignissim ante ornare, cursus ornare neque feugiat. Donec nibh lacus, malesuada ut mattis vel, porta sed neque. Maecenas fringilla velit et eros consequat, in tincidunt lorem maximus. Nulla ultrices blandit venenatis.

Suspendisse molestie feugiat lorem venenatis elementum. Vivamus id consectetur libero. Aliquam hendrerit faucibus urna, eget maximus nibh accumsan eu. Nam laoreet enim non risus bibendum, eget egestas sem fermentum. Pellentesque eu laoreet nisi. Quisque eleifend elit sed ante pellentesque, in lacinia nisi euismod. Proin libero eros, pellentesque eu sapien ut, dapibus convallis diam. Quisque luctus justo eget turpis dapibus venenatis. Vivamus accumsan urna non tristique aliquam. Morbi cursus libero ac tellus bibendum, et tincidunt est consectetur. Integer sed felis turpis. Praesent blandit fermentum placerat. Aliquam imperdiet semper dictum.


```js
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const showdown = require('showdown');
const fns = require('date-fns');

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

  generateMetaHtml() {
    return `<div class="blog-meta">
  <p class="blog-date">${fns.format(new Date(this.date || Date.now()), 'EE do MMMM yyyy')}</p>
</div>`;
  }

  generateHtmlContent() {
    return {
      content: this.postContetAsHtml(),
      pageTitle: `${this.title} ${pageTitleBase}`,
      title: this.title,
      date: this.date,
      tags: this.tags,
      [`<p>{meta}</p>`]: this.generateMetaHtml(),
      header: this.headerContent(),
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
    console.log(RED + "Failed to create file", err.message);
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
      data = data.replace(k.includes('{') ? k : `{${k}}`, v);
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


```

Pellentesque mauris urna, facilisis sit amet rutrum a, varius at lacus. Aliquam erat volutpat. Morbi quam odio, faucibus vel dolor ac, aliquet finibus orci. Suspendisse elementum risus at sapien lacinia rutrum. Integer quam dolor, auctor a dapibus id, malesuada non tortor. Quisque vestibulum et dolor ut convallis. Pellentesque mattis pretium felis. Praesent venenatis pulvinar feugiat. Duis varius maximus nisi, id viverra leo. Morbi condimentum quis massa ac feugiat. Praesent ut ligula accumsan, ultricies libero non, vestibulum ipsum.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent eget justo a nibh maximus placerat. Vivamus quis risus vulputate, bibendum mi eget, luctus ligula. Nunc porttitor efficitur enim ut viverra. Morbi blandit, erat in interdum egestas, ligula ligula commodo ligula, vitae placerat augue lorem sed arcu. Aenean eu dictum purus. Integer blandit rhoncus massa, nec rhoncus arcu consectetur pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras fermentum sodales quam id varius. Nam fringilla nec orci sed faucibus. Suspendisse gravida risus quis rhoncus porttitor. Pellentesque ornare efficitur quam, et ultricies lectus dictum ut.

Fusce eget urna quis purus rhoncus blandit. Sed cursus convallis ipsum, et dictum purus efficitur eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque viverra et magna et imperdiet. Duis ac mollis augue. Suspendisse quis enim neque. Praesent porttitor dolor in velit tempor suscipit. Vestibulum nibh purus, vehicula eget purus sit amet, tempor dictum elit. Proin pharetra quam sit amet erat porttitor consequat. Nulla sodales libero id neque blandit pharetra. Cras ullamcorper nisl aliquet aliquam egestas. Nulla quis dolor eros. Vivamus euismod sagittis lectus a sodales. Nam viverra feugiat convallis. Nullam vel erat suscipit ipsum posuere pellentesque. Nunc vehicula elit non mauris gravida sodales.