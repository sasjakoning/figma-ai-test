---
title: Adding RSS to my website
parent: blog
date: 2025-07-09
description: After being mildly interested in RSS feeds for several months now, I finally decided to create my own, and add RSS to sasjakoning.com.
---

Ever since I started working at my current job, I’ve been reading articles more often. This is partially due to the fact that we have bi-weekly meetings in which we share new and/or interesting tech-related articles and/or videos. But also because I’ve generally grown more interested in new web features, hack-y stories and fun tidbits involving the digital world.

I already followed channels such as Frontend Focus, CSS Weekly and Syntax.fm which share e-mails with interesting articles on a regular basis, but I felt like I was lacking a more original reading experience. I enjoy digging through the mess of the internet to find interesting blogs and articles that make me feel like I’ve found a rare gem.

## Using an RSS Feed

Because of this, RSS feeds had been piquing my interest for quite a while. Several blogs I’ve come across show the little RSS icon and every time I curiously clicked on them, it led me to an unstyled page filled with code. For months I’d just shrug and move on, but now I've decided to finally learn more about RSS and see if I could implement it for my blog.

I started with a simple search query: “rss feed explained” and landed on an [article](https://rss.com/blog/how-do-rss-feeds-work/) from RSS.com which provided a basic explanation of RSS feeds.

Along with that I checked Wikipedia for a quick description:

> RSS (RDF Site Summary or Really Simple Syndication) is a web feed that allows users and applications to access updates to websites in a standardized, computer-readable format. Subscribing to RSS feeds can allow a user to keep track of many different websites in a single news aggregator, which constantly monitors sites for new content, removing the need for the user to manually check them. News aggregators (or "RSS readers") can be built into a browser, installed on a desktop computer, or installed on a mobile device.

*- *[*Wikipedia*](https://en.wikipedia.org/wiki/RSS)

And I went more in depth learning that RSS is a dialect of XML, which is short for Extensible Markup Language, most often used for storing, transmitting and reconstructing data. In a way, it's similar to HTML, but XML offers more flexibility and is made to be easily understood by both humans and computers.

An example of what a piece of RSS code would look like is this:

```xml
<rss version="0.91">
  <channel>
	<title>WriteTheWeb</title>
	<link>http://writetheweb.com</link>
	<description>News for web users that write back</description>
	<language>en-us</language>
	<copyright>Copyright 2000, WriteTheWeb team.</copyright>
	<managingEditor>editor@writetheweb.com</managingEditor>
	<webMaster>webmaster@writetheweb.com</webMaster>
	<image>
	  <title>WriteTheWeb</title>
	  <url>http://writetheweb.com/images/mynetscape88.gif</url>
	  <link>http://writetheweb.com</link>
	  <width>88</width>
	  <height>31</height>
	  <description>News for web users that write back</description>
	</image>
	<item>
		<title>Giving the world a pluggable Gnutella</title>
		<link>http://writetheweb.com/read.php?item=24</link>
		<description>WorldOS is a framework on which to build programs that work like Freenet or Gnutella -allowing distributed applications using peer-to-peer routing.</description>
	</item>
  </channel>
</rss>
```

Following the original article I found, I installed the RSS Feed Reader by feeder.co. After doing so, it was surprisingly easy to add sites to my feed. I clicked on the RSS icons on the different websites, and instead of showing me the unformatted  code, it showed me a neatly structured page and the option to add the page to my feed. Easy!

After setting that up with the sites I find interesting, I was onto the next challenge; Add RSS to my own site.

## Adding RSS to my own site

According to [this article](https://dev.to/ndesmic/adding-an-rss-feed-to-a-blog-2klj), adding RSS to my portfolio sounded pretty simple. Create an XML document, and every time I post something new, I add it there. And then RSS feeds would check those documents at regular intervals.

Now, I could do all that manually. But I like to decrease the amount of steps necessary as much as possible to make writing blogposts more accessible for myself. And I'm lazy.

So I continued looking and checked if there's anything Nuxt-specific for this. And there is! [This module](https://nuxt.com/modules/module-feed) provides a way to generate RSS feeds. Or at least, I think so. When I read through it I found it confusing and decided to look elsewhere.

Moving on from Nuxt modules, I came across [an article](https://www.storyblok.com/tp/how-to-generate-an-rss-feed-with-a-headless-cms) which uses Storyblok to generate an RSS Feed.

I followed the instructions listed in that article which gave me a pretty good understanding of how to generate XML strings based on my current blogposts. Something I struggled with, though, was generating this string and updating it whenever I upload a new blogpost.

With my current setup, my website is static and uses the Storybook API to fetch new posts. This way I don't have to redeploy my site every time I write something new. This means that I can't regenerate the static XML file without having to redeploy.

So, based on what I learned following the instructions in that article, I asked some support from AI which advised me to set up the code as an API request from my server-side.

I created a utility function which would fetch all the blogposts currently available:

```javascript
export async function getAllBlogPosts() {
    // Get the Storyblok access token from the env
    const config = useRuntimeConfig();
    const token = config.STORYBLOK_ACCESS_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN;

    // Fetch all stories starting with 'blog', ignore the root page and sort by last published.
    const response = await $fetch('https://api.storyblok.com/v2/cdn/stories', {
        query: {
            token,
            version: 'published',
            starts_with: 'blog/',
            is_startpage: 'false',
            sort_by: 'published_at:desc',
            per_page: 100, // Adjust as needed
        },
    });
    // You can fetch up to 100 stories per request. I'm nowhere near a 100 currently, but will look for a workaround in the future.

    return response.stories;
}
```

And in my server/api folder, I created a `rss.xml.get.js` file:

```javascript
import { getAllBlogPosts } from '../utils/rss.js';
const config = useRuntimeConfig();

export default defineEventHandler(async event => {
    try {
        // Get all the blog stories (As explained above)
        const allBlogPosts = await getAllBlogPosts();

        // Setup base data such as hostname
        const hostname = config.public.WEBSITE_URL || process.env.WEBSITE_URL;
        const rssTitle = `Sasja Koning - Blog`;
        const rssDescription = `All blog posts from ${hostname}`;

        // Generate the XML structure for each story in the allBlogPosts object
        const rssEntries = allBlogPosts.map(story => {
            return `
                    <item>
                        <title>${story.content.title}</title>
                        <description>${story.content.shortDescription}</description>
                        <link>${hostname}/${story.full_slug}</link>
                        <guid isPermaLink="false">${story.uuid}</guid>
                        <pubDate>${new Date(story.published_at).toUTCString()}</pubDate>
                    </item>`;
        });

        // Generate the entire XML string
        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
                    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
                        <channel>
                            <title>${rssTitle}</title>
                            <description>${rssDescription}</description>
                            <link>${hostname}</link>
                            <atom:link href="${hostname}/api/rss.xml" rel="self" type="application/rss+xml" />
                            <ttl>1800</ttl>
                            ${rssEntries.join('')}
                        </channel>
                    </rss>`;

        // Set the correct content type for RSS
        setHeader(event, 'content-type', 'application/rss+xml');
        return rss;
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to generate RSS feed',
        });
    }
});
```

And that's it! Now I could access my RSS feed through [https://sasjakoning.com/api/rss.xml](https://sasjakoning.com/api/rss.xml). And whenever I post something new, it automatically gets updated.

![](../../assets/img/blog/adding-rss-to-my-website/xdfsdf.webp)

## Final thoughts

I've now added the RSS function to my site, and you can find the link to it in the menu bar. I'm currently working on a new version of my portfolio in which I want to divide my Weekly Notes and blogposts a little more. When I do that, I'll make separate RSS files as well, and add images to the previews which  should be possible.

Now I know that RSS isn't used much anymore. Less and less websites are offering it but that's not really why I decided to implement it. I like the gimmicks of the 'old web' such as these RSS feeds, Geocities and Webrings (PS. One day I'll make a Webring... When I know enough people with websites...) and wanted to explore it.

Are there any other classic web things that might be fun to implement? Let me know :D. For the new version I've already added a visitors counter which is fun.
