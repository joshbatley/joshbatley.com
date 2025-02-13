{
  "title": "MarkDown Tester",
  "date": "2026-02-11",
  "tags": ["code", "design", "hello world"]
}

#  Testing More Then One Aa

{meta}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra magna dui, at tincidunt nisl ultrices nec. Mauris ut arcu quis orci commodo congue. Donec volutpat mattis vulputate. Proin a vulputate justo. Praesent sodales nulla dignissim ante ornare, cursus ornare neque feugiat. Donec nibh lacus, malesuada ut mattis vel, porta sed neque. Maecenas fringilla velit et eros consequat, in [tincidunt](https://www.checkout.com) lorem maximus. Nulla ultrices blandit venenatis.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**Bold**

*italic*

> block quote


1. list 1
2. list 2
3. list 3

- list 1
- list 2
- list 3

---

![alt text](/src/assets/post-images/waterfall.jpg "Title")


```js
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
```