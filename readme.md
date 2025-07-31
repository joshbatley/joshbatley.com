# Josh Batley's Personal Website

A personal website and blog for Josh Batley, a Software Engineer based in London.

[joshbatley.com](https://joshbatley.com)

## Overview

This project is a minimalist personal website that includes:
- A homepage with personal information and social links
- A blog section with markdown-based articles
- Light/dark theme toggle functionality
- Mobile-responsive design

## Technology Stack

- **Build Tool**: [Parcel](https://parceljs.org/) for bundling and building
- **Styling**: Custom CSS with responsive design
- **Blog**: Markdown files converted to HTML using [Showdown](https://github.com/showdownjs/showdown)
- **Date Formatting**: [date-fns](https://date-fns.org/) for handling dates in blog posts

## Project Structure

- `/src`: Source files including HTML, CSS, and assets
- `/posts`: Markdown files for blog posts
- `/templates`: Templates for generating pages
- `/scripts`: Build scripts for processing blog posts and site generation
- `/meta`: Contains deployment files like CNAME and robots.txt
- `/_site`: Output directory for the built website

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Create a new blog post
pnpm run new-post --title "Your Post Title"
```

## Deployment

The site is built as static HTML/CSS files that can be deployed to any static hosting service. The build process copies files from the `/meta` directory (including CNAME and robots.txt) to the output directory for deployment.

## FAQ

Q: Why no JavaScript?

A: It's a tiny website for me to throw some lines on. See [KISS](https://en.wikipedia.org/wiki/KISS_principle)

Q: How are blog posts created?

A: Blog posts are written in Markdown format in the `/posts` directory. The build process converts them to HTML pages.
