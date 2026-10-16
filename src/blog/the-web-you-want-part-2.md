---
title: The Web You Want - Part 2
parent: blog
date: 2026-06-11
sidenote: Do you like this sidenote?
description: As part of my yearly goals at work, I'm visiting a couple of events and conventions to keep my mind fresh and stay up to date with the latest developments in tech and design.
---

On June 10th I visited the second part of [The Web You Want](https://the-web-you-want.org/), a web-focused conference hosted by CMD Amsterdam.

These are the people that hosted talks/workshops I attended:

- Léonie Watson
- Cyd Stumpel
- Bjorn Wijers
- Jeremy Keith

## Léonie Watson

[Léonie Watson](https://tink.uk/about-leonie/) is the co-founder and director of [TetraLogical](https://tetralogical.com/), which is a company focused on accessibility. Along with that, she's part of the W3C Board of Directors and often hosts talks about web standards, accessibility, and inclusive design.

During her talk she spoke about how she 'loves' AI. Which turned some heads, but this is mainly because she has been blind for over 25 years. She showed some examples of how AI helps her in her day-to-day life.

For example, the [European Accessibility Act](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32019L0882) is a document of 46 pages with no headings and tons of tables, making it awful to read using a screen reader (ironic, isn't it?). Instead, Léonie fed the document to AI, and it could point her to specific sections and explain them based on her questions.

![Screenshot of the first page of the European Accessibility Act which in fact is not accessible at all](../../assets/img/blog/the-web-you-want-part-2/european-accessibility-act.webp)
*(Screenshot from the European Accessibility Act)*

Another example is online shopping. When she shops for clothing, image descriptions are often lackluster or don't exist at all. When she asks AI to describe the image, it does a much better job.

Léonie also gets great use out of the Meta AI glasses. It can describe the environment to her and help her identify and find objects.

However, AI is still problematic. It's owned by the wrong people, and for the most part AI compensates for what the web is failing at.

Léonie wants a web that doesn't need AI to compensate.

## Cyd Stumpel

[Cyd Stumpel](https://cydstumpel.nl/about/) is a Creative Developer and teacher who creates accessible and creative websites. She's very involved with CMD, and I've joined talks from her before in the past.

Cyd's talk was about how she prefers enhanced motion. She spoke about how many developers make websites for themselves, with fancy animations and complex features, while in reality users often just want to get things done. For many people, the web is simply a tool, so when a site's complexity gets in the way of that, the user experience drops.

She mentioned Progressive Enhancement, which means that you get the core of the feature working first before you add to it. A common example of this is escalators. In their most basic form, without power, they function as stairs, which is the core goal. When powered, they escalate, which adds to the experience.

![Picture of two escalators next to each other in a somewhat low light setting](../../assets/img/blog/the-web-you-want-part-2/escalator.webp)
*(*[*Unsplash*](https://unsplash.com/photos/architectural-photo-of-escalator-eBi0v1D_po8)*)*

On the flip side, you have Graceful Degradation. This means that something starts as a fully featured experience and downgrades to the base-capable devices. It still works, but it's not the focus of the feature.

Cyd is a big fan of Progressive Enhancement:  
"Design for the worst acceptable experience first; everything that comes after becomes an enhancement."

She also did some live coding focused on HTML and CSS features, in which she makes use of the [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports) tag, which helps developers implement features that may not be fully supported yet. In some cases you can also just add limited CSS properties and have them be ignored automatically by unsupported browsers.

Something like this happens on my own site as well. For the pointy circles around items on my homepage, I use the [border-shape](https://caniuse.com/?search=border-shape) CSS property, which currently (Jun 2026) has limited support. When browsers don't have this feature, they simply ignore it, which falls back to a simple border of 1px with a radius of 50%.

<!-- | ![Screenshot of an item on sasjakoning.com with a border using border-shape in Chrome where it is supported](../../assets/img/blog/the-web-you-want-part-2/website-chrome.webp) | ![Screenshot of an item on sasjakoning.com with a border using border-shape in Firefox where it is not supported](../../assets/img/blog/the-web-you-want-part-2/website-firefox.webp) |
| --- | --- |
| Chrome | Firefox | -->

Chrome vs Firefox

<div class="image-grid" style="--columns: 2;">
  <img src="../../assets/img/blog/the-web-you-want-part-2/website-chrome.webp" alt="Screenshot of an item on sasjakoning.com with a border using border-shape in Chrome where it is supported">
  <img src="../../assets/img/blog/the-web-you-want-part-2/website-firefox.webp" alt="Screenshot of an item on sasjakoning.com with a border using border-shape in Firefox where it is not supported">
</div>


Cyd showed some cool features called [interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size) and [transition-behaviour allow-discrete ](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior#description)which allow you to animate from `display: none;` to `height: auto;`.

I made a small demo:

<iframe height="300" style="width: 100%;" scrolling="no" title="Interpolate size" src="https://codepen.io/sasjakoning/embed/KwaMKbE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
  See the Pen <a href="https://codepen.io/sasjakoning/pen/KwaMKbE">
  Interpolate size</a> by Sasja (<a href="https://codepen.io/sasjakoning">@sasjakoning</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Also mentioned were the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API), [@starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style), [inset clippath](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/inset) and [sibling-index()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index).

## Bjorn Wijers

[Bjorn Wijers](https://burobjorn.nl/) is a tech consultant and software developer mainly focused on open-source technology. Bjorn is also one of the creators of [DoeiDag](https://doeidag.nl/), which is an initiative to turn away from big tech.

![Small comic of a goose getting rid of big tech for DoeiDag made by Astrid Poot](../../assets/img/blog/the-web-you-want-part-2/doeidag.webp)
*(Illustrated by *[*Astrid Poot*](https://astridpoot.nl/)*)*

During his workshop, Bjorn spoke about digital autonomy and big tech.

Big tech are companies that:

- Use data for profit
- Are large tech companies
- Control markets and can limit access
- Impact governments and politics
- Have influence on society and culture

Think of companies like Meta, Google and Amazon.

![Illustration of the 10 largest corporations by market capitalisation from 2022, Apple, Microsoft and Google are the largest.](../../assets/img/blog/the-web-you-want-part-2/bigtech.webp)
*(*[*Wikipedia*](https://en.wikipedia.org/wiki/Big_Tech#/media/File:10_Largest_Corporations_by_Market_Capitalization.png)*)*

Bjorn showed a good example of how CEOs of big social media platforms are getting involved in politics and how suddenly people can get banned from any US-based software just because the president said so.

With the state of politics in the US right now, it is quite worrying that Europe is still depending on a lot of software based there.

Bjorn asked us about where we think we stand when it comes to digital autonomy using a scale from A (fully independent) to G (no autonomy). Personally I put myself around D, as I am working on self-hosting and federation, but still use apps like TikTok and X daily.

According to Bjorn, full digital autonomy is near impossible, as this includes the gathering of raw materials and creating computer chips. What's most important on this scale is that you have the capacity to make an informed and uncoerced decision when it comes to the web you use.

He gave us a list of tools and apps we could use as alternatives to ones part of big tech and sketchy businesses.

- [Codeberg](https://codeberg.org/) instead of Github and Gitlab
  
  - Non-profit and community-led.
- [Penpot](https://penpot.app/) instead of Figma
  
  - Open source, can be self-hosted
- [Zola](https://www.getzola.org/) for static site generation (SSG)
- [Librewolf](https://librewolf.net/) as a browser alternative
  
  - Fork of Firefox, focused on privacy, security and freedom.
- [Mastodon](https://mastodon.social/explore) instead of social media like X and Instagram
  
  - Open source, can be self-hosted. Uses the ActvityPub protocol to communicate with other instances. No ads btw.
- [Element](https://element.io/) instead of Slack
  
  - Based on the Matrix open standard, similar to ActivityPub in it being federated but more focus on real-time messaging. Can be self-hosted and is open source.
- [Zimbra](https://www.zimbra.com/) for email
- [Limesurvey](https://www.limesurvey.org/) for surveys and research
- [Plausible](https://plausible.io/) for analytics, instead of Google Analytics and Cloudflare analytics.
- [Tuxedo](https://www.tuxedocomputers.com/) for computers
  
  - Optimised for Linux, customisable
- [Listmonk](https://listmonk.app/) for newsletters and mailing lists
- [Formbricks](https://formbricks.com/) for surveys
- [Peertube](https://peertube.tv/) instead of Youtube
  
  - Open source and federated
- [Pretix](https://pretix.eu/about/en/) for ticketing
- [Pretalx](https://pretalx.com/p/about/) for conferences
- [Big Blue Button](https://bigbluebutton.org/) for video conferences/virtual classrooms
- [Nextcloud](https://nextcloud.com/) for cloud storage, office, video calls etc
  
  - Seems to be very corporation-focused in terms of pricing
- [Prikkert](https://prikkert.nl/) for date picking
- [LibreOffice](https://nl.libreoffice.org/) instead of Microsoft Office 365
- [Cryptpad](https://cryptpad.fr/) for RSVPs, forms and more
- [DeltaChat](https://delta.chat/en/) instead of WhatsApp
  
  - Decentralised, based on mail
- [Comaps](https://www.comaps.app/nl/) instead of Google Maps
  
  - Based on [OpenStreetMap](https://www.openstreetmap.org/)

Bjorn also suggested [switching.software](http://switching.software), which helps you compare big tech to better alternatives.

In the end it's important to start conversations with people about big tech and open-source software. To do so without judgement, ask what can be done better and be more informed by the end of it.

## Jeremy Keith

[Jeremy Keith](https://adactio.com/) is a web developer and the cofounder of [Clearleft](https://clearleft.com/). He went more in depth about the past of the web, in what areas it got better over time.

In the early times of the web there was only a small set of hexadecimal colours. Later on this expanded to thousands of colours, and now you have so many choices and different colour types such as RGBA, HSL and more.

![Screenshot of different colorspaces for the web such as HSV, OKL and HSL](../../assets/img/blog/the-web-you-want-part-2/colorspaces.webp)
*(*[*bram.us*](http://bram.us)*)*

Same goes for fonts, where originally only system fonts worked, now you can use any font you want in many types of formats.

Responsive design was something unthinkable back then as well. Everything had fixed widths and was all made of one type of device, the desktop PC. Then phones came in and everything changed.

Jeremy went on to talk about how the user experience nowadays sucks. He mentioned two types of advertising:

**Contextual advertising**, which does not require your data but simply advertises based on the content displayed.

And **behavioural advertising**, which is based on your data. That's what all the popups and cookies are for. They gather your data to sell to others, which in turn can display ads based on your online behaviour. You may have experienced this, where you Google something, like washing machines, then go on social media and the first thing you see is an ad for washing machines.

Something Jeremy also talked about was overdoing it in terms of web development. Developers need to focus on what the user actually needs and stop trying to solve problems they don't yet have.

Why would you use all sorts of libraries and tools for page transitions and navigations when it's already built into the browser? I think he made a good point in this, and it made me realise that indeed, we should be using the browsers' capabilities more often instead of opting for complex frameworks and such.

## Conclusion

I had a really good time during the event; the talks were inspiring and might have motivated me to kick Nuxt and Storyblok out of my website and go full barebones. I just need to find the time to do so...

The two parts of The Web You Want have been a great initiative, and I look forward to potential new events, even if they're on a smaller scale.

Attending conferences such as these has helped me keep my mind fresh, especially now that I code a little less at work.
