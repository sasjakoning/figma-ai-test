// 1. Delete site folder and recreate it empty
import fs, { link } from "node:fs"
import path from "node:path";
import { markdownToHtml } from "./parser.js";
import { toKebabCase, renderPostTemplate, escapeXml } from "./helpers.js";
import linksList from '../src/links/links.json' with { type: 'json' };

let postsList = [];

const lastBuildDate = new Date().toUTCString();

// Empty the contents of _site without deleting the folder itself, so the
// `pages` git worktree link (_site/.git) survives a rebuild. (minor ai intervention)
if (fs.existsSync("_site")) {
    for (const entry of fs.readdirSync("_site")) {
        if (entry === ".git") continue
        fs.rmSync(path.join("_site", entry), { recursive: true, force: true })
    }
} else {
    fs.mkdirSync("_site")
}

// 2. Copy static assets to site directory
fs.cpSync("src/assets", "_site/assets", { recursive: true });
// Homepage
fs.cpSync("src/index.html", "_site/index.html");
fs.cpSync("src/about/index.html", "_site/about/index.html");
fs.cpSync("src/other/index.html", "_site/other/index.html");

// 3. Load templates, read them into memory
const templatesFolder = fs.readdirSync("src/templates", "utf8");
let templates = new Map();

templatesFolder?.forEach(template => {
    // Get file contents of each item in templates folder, cut off file extension for the name in the object. so it can be found using object.get("name")
    templates.set(template.replace(/\.[^/.]+$/, ""), fs.readFileSync(`src/templates/${template}`, "utf8"))
});

// 4. Discover content, scan src/pages/ and src/blog/ etc for .md files
const markdownBlogposts = fs.readdirSync("src/blog", { withFileTypes: true });
const markdownWeeknotes = fs.readdirSync("src/weeknotes", { withFileTypes: true });

// 5. For each markdown file:
const buildPosts = (posts) => {
    const list = [];
    posts.forEach(post => {
        // read raw text
        const rawData = fs.readFileSync(`${post.parentPath}/${post.name}`, "utf8")

        // split of frontmatter (--- block) from the body for metadata
        // had some AI help here
        function splitFrontmatter(content) {
            const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
            if (!match) return { meta: {}, body: content };
            const meta = parseFrontmatter(match[1])
            const body = content.slice(match[0].length);

            return { meta, body }
        }

        // Make metadata readable
        function parseFrontmatter(text) {
            const meta = {};
            for (const line of text.split("\n")) {
                if (!line.trim()) continue;
                const i = line.indexOf(":");
                if (i === -1) continue;
                const key = line.slice(0, i).trim();
                const value = line.slice(i + 1).trim();
                meta[key] = value;
            }
            return meta
        }

        const splitData = splitFrontmatter(rawData)

        // run body through parser md -> html
        const parsedData = markdownToHtml(splitData.body)

        // Use renderTemplate helper function to insert parsed content into html template
        const renderedData = renderPostTemplate(templates.get("post"), parsedData, splitData.meta)

        // Work out the output path: blog/post-1.md -> _site/blog/post-1/index.html
        const internalSlug = path.join("_site", splitData.meta.parent, toKebabCase(splitData.meta.title))
        const productionSlug = toKebabCase(splitData.meta.title)
        splitData.meta.slug = productionSlug;

        list.push(splitData.meta)

        // Create the folders (mkdir -p) and write the files
        fs.mkdirSync(internalSlug, { recursive: true })
        fs.writeFileSync(`${internalSlug}/index.html`, renderedData)
    });

    return list;
}

// 6. Gather post metadata while rendering posts, put into a list with title, date, slug etc.
const blogposts = buildPosts(markdownBlogposts);
const weeknotes = buildPosts(markdownWeeknotes);

// 7. Turn that list into an overview page such as blog overview.
const renderListTemplate = (template, data) => {
    data.sort((a, b) => new Date(b.date) - new Date(a.date))

    let html = [];
    data.forEach(item => {
        html.push(`
            <li class="list-item__wrapper">
                <a class="list-item" href="${item.slug}">
                    <h3 class="list-item__title">${item.title}</h3>
                    <p class="list-item__date">${item.date}</p>
                    <p class="list-item__description">${item.description}</p>
                </a>
            </li>
        `)
    });

    // html.join("") to get rid of commas from replace function.
    return template
        .replace("{{ list }}", html.join(""))
        .replace("{{ type }}", data[0].parent)
}

const renderedBlogposts = renderListTemplate(templates.get("list"), blogposts)
fs.writeFileSync("_site/blog/index.html", renderedBlogposts)

const renderedWeeknotes = renderListTemplate(templates.get("list"), weeknotes)
fs.writeFileSync("_site/weeknotes/index.html", renderedWeeknotes)


const renderLinksTemplate = (template, data) => {
    // split array into two based on linkType
    const { blogroll = [], interesting = [] } = Object.groupBy(data, ({ linkType }) => linkType);

    const renderItems = (items) => items.map(item => `
            <li>
                <a href="${item.url}" target="_blank">
                    <h3>${item.url}</h3>
                    <p>${item.description}</p>
                </a>
            </li>
    `).join("");

    return template
        .replace("{{ blogroll }}", renderItems(blogroll))
        .replace("{{ interesting }}", renderItems(interesting))
}

const renderedLinks = renderLinksTemplate(templates.get("links"), linksList)
fs.mkdirSync("_site/links/", { recursive: true })
fs.writeFileSync("_site/links/index.html", renderedLinks)

// 8. Extras such as RSS and sitemap

const generateRSS = (template, data, type) => {
    let html = [];
    data.forEach(item => {
        const convertedDate = new Date(item.date).toUTCString()
        html.push(`
            <item>
                <title>${escapeXml(item.title)}</title>
                <link>https://sasjakoning.com/${item.parent}/${item.slug}/</link>
                <guid isPermaLink="true">https://sasjakoning.com/${item.parent}/${item.slug}/</guid>
                <pubDate>${convertedDate}</pubDate>
                <description><![CDATA[ <p>${item.description}</p> ]]></description>
            </item>
        `)
    });

    // html.join("") to get rid of commas from replace function.
    return template
        .replace("{{ content }}", html.join(""))
        .replaceAll("{{ type }}", type)
        .replace("{{ lastBuildDate }}", lastBuildDate)
}

const renderedBlogRSS = generateRSS(templates.get("feed"), blogposts, "blog")
fs.writeFileSync("_site/blog/feed.xml", renderedBlogRSS);

const renderedWeeknotesRSS = generateRSS(templates.get("feed"), weeknotes, "weeknotes")
fs.writeFileSync("_site/weeknotes/feed.xml", renderedWeeknotesRSS);


const generateSitemap = (template, data) => {
    let html = [];
    data.forEach(item => {
        html.push(`
            <url>
                <loc>https://sasjakoning.com/${item.parent}/${item.slug}/</loc>
                <lastmod>${item.date}</lastmod>
            </url>
        `)
    });

    // html.join("") to get rid of commas from replace function.
    return template
        .replace("{{ content }}", html.join(""))
}

// Combine blogposts and weeknotes into 1 list
const sitemapList = blogposts.concat(weeknotes);

const renderedSitemap = generateSitemap(templates.get("sitemap"), sitemapList)
fs.writeFileSync("_site/sitemap.xml", renderedSitemap);