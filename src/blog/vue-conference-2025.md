---
title: Vue Conference 2025
parent: blog
date: 2025-03-14
description: I've gone to the Vue.js Conference 2025 in Amsterdam for a day; here are some interesting insights from the various talks I've attended.
---

On the 13th of March 2025 I've gone to the Vue.js Amsterdam Conference with three of my colleagues for a day. Here are some personal insights from the various talks.

## The talks:

- The State of Nuxt 2025 by [Daniel Roe](https://roe.dev/)
- Nitro v3 release + Vite by [Pooya Parsa](https://www.linkedin.com/in/pooyaparsa/?originalSubdomain=nl)
- The Intuitive Vue UI Library by [Sebastien Chopin](https://atinux.com/)
- The New Nuxt Content by [Baptiste Leproux](https://www.linkedin.com/in/baptiste-leproux-618842b0/?originalSubdomain=fr)
- Automate all the things. AI, Nuxt, Contentstack, Cloudinary and more by [Tim Benniks](https://timbenniks.dev/)
- Fast & Vuerious - Making commerce. Faster by [Jakub Andrzejewski](https://www.linkedin.com/in/jakub-andrzejewski/?originalSubdomain=pl)
- Utilizing Vue and Nuxt to make micro services by [Reza Ranjbar](https://www.linkedin.com/in/rebaar/)
- Vue the Shopware Way by [Sebastian Seggiwiß](https://www.linkedin.com/in/sebastian-seggewi%C3%9F/?originalSubdomain=de)
- Being a 10x developer is not what you think it is by [Filip Rakowski](https://www.linkedin.com/in/filip-rakowski-a43671129/?originalSubdomain=pl)
- How to Reach & Teach Developers by [Adam Jahr](http://adamjahr.com/)
- The Official State of Vue Report 2025 & Discussion Panel by [Monterail](https://www.monterail.com/)

### The State of Nuxt 2025

By [Daniel Roe](https://roe.dev/)

Daniel Roe is an open-source maintainer and founder leading the [Nuxt](https://nuxt.com/) core team. He kicked off the day talking about the state of Nuxt in 2025 and spoke about some new and upcoming features. Something I found interesting that I hadn't heard of before are [Nuxtcore Modules](https://nuxt.com/docs/guide/concepts/modules). These modules can be used within Nuxt to extend the framework and simplify integrations. Some modules that caught my attention are [@nuxt/devtools](https://nuxt.com/modules/devtools), [@nuxt/image](https://nuxt.com/modules/image), [@nuxt/eslint](https://nuxt.com/modules/eslint), [@nuxt/icon](https://nuxt.com/modules/icon), and [@nuxt/fonts](https://nuxt.com/modules/fonts). For example, by installing @nuxt/icon, you would have access to 200,000 ready-to-use icons from Iconify. And, the Nuxt team has been working on a new way to set up a new project in which you can easily select these modules through the CLI. Cool!

### The Intuitive Vue UI Library

By [Sebastien Chopin](https://atinux.com/)

![](../../assets/img/blog/vue-conference-2025/vueuilibrary.webp)

Sebastien is the CEO at [NuxtLabs](https://nuxtlabs.com/) (responsible for Nuxtcore modules such as @nuxt/devtools and @nuxt/image) and the creator of Nuxt. He held his talk about [NuxtUI](https://ui.nuxt.com/), an open-source Vue UI library with over 50 components built with Tailwind CSS and Reka UI. Personally, I'm not very interested in UI libraries, as I prefer making components on my own for maximum creativity, but the way the library is set up provides a good reference for the component library we're currently building at my job. Their library also uses icons from [Iconify,](https://iconify.design/) which could be interesting for us, as we currently use Fontawesome which has been having some issues.

Along with that, Sebastien mentioned Nuxt [Compodium,](https://github.com/romhml/compodium?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com) which seems pretty similar to Storybook and could potentially be used as an alternative(?).

And, he talked a little about [Tempad Dev,](https://github.com/ecomfe/tempad-dev) which is a free Figma Devmode alternative. It's a [Chrome extension](https://chromewebstore.google.com/detail/tempad-dev/lgoeakbaikpkihoiphamaeopmliaimpc) you can install and then use in Figma, in the browser. It looks like a pretty good alternative, though it seems to miss some features such as variable spacing between items when you hover over the component. Currently that just shows the fixed values.

### The New Nuxt Content

By [Baptiste Leproux](https://www.linkedin.com/in/baptiste-leproux-618842b0/?originalSubdomain=fr)

![](../../assets/img/blog/vue-conference-2025/nuxtcontent.webp)

Baptiste is the lead development engineer at [Nuxt Labs,](https://nuxtlabs.com/) and he held his talk about [Nuxt Content](https://content.nuxt.com/). A Git-based CMS for Nuxt projects. Nuxt Content is a Nuxtcore module that can work as a very simple CMS for your project. What mainly interested me during this talk is how all content is hosted within your git project. So, any new articles, etc., you write and publish will be committed to a folder in your project, which is hosted on (for example) GitHub. Along with that, Nuxt Content is based upon Markdown, which is very easy to use for developers. Nuxt Content works along with [Nuxt Studio](https://nuxt.studio/) which is the interface used for this CMS that works similarly to [Notion](https://www.notion.com/).

Once you have everything set up, a code snippet of a markdown file could look like this:

```markdown
---
title: Projects
description: A list of projects I've worked on
---

::works
#title
Projects

#subtitle
A list of projects I've worked on
::
```

The elements using `::` are Vue components loaded in using MDC which stands for MarkDown Components Syntax.

```markdown
::card
The content of the card
::
```

Which is equal to:

```markdown
<!-- components/content/Card.vue -->
<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
```

*Source: *[*https://content.nuxt.com/docs/files/markdown#block-components*](https://content.nuxt.com/docs/files/markdown#block-components)

I feel like it could serve as a pretty good alternative to Storyblok, especially if the only people using the CMS are developers.

### Automate all the things. AI, Nuxt, Contentstack, Cloudinary and more

By [Tim Benniks](https://timbenniks.dev/)

![](../../assets/img/blog/vue-conference-2025/timbennik.webp)

Tim is a Developer Experience Lead at [Contentstack](https://www.contentstack.com/)[,](https://www.contentstack.com/request-demo?gad_source=1&device=c&gclid=CjwKCAjwp8--BhBREiwAj7og1zWD0q4QNZf1gpg5wh9eECzbehTTdBSypGm8pslNqqiQpY2NlOhGuBoCKkkQAvD_BwE&campaign=17236242949&placement=&adgroup=135039425885&utm_source=google&qgad=597476778705&utm_campaign=evgn-glob-dg-branded-emea&qgterm=contentstack&utm_medium=paid-search&creative=597476778705&keyword=contentstack&matchtype=b&utm_content=contentstack_brand&network=g) and he held a pretty interesting talk about how he's been using his door camera to record videos. He had been doing this for a while, and later on decided to look into using AI to generate these videos. For this he used [Contentstack](https://www.contentstack.com/) as his CMS, [HeyGen AI](https://www.heygen.com/) to generate the videos, [Elevenlabs](https://elevenlabs.io/) to generate his voice, and [Cloudinary](https://cloudinary.com/) as his video API which lead to some convincing results! Kind of scary in a way.

In general, I didn't get a whole lot of practical use out of this talk, but it was really interesting to hear about and the way Tim presented it was well done.

You can learn more about it here: [https://doorbell-devrel.timbenniks.dev/](https://doorbell-devrel.timbenniks.dev/)

### Fast & Vuerious - Making commerce. Faster

By [Jakub Andrzejewski](https://www.linkedin.com/in/jakub-andrzejewski/?originalSubdomain=pl)

Jakub is a full-stack developer specializing in Vue and Node, specifically Nuxt. Jakub held his talk about improving performance for e-commerce websites. And while e-commerce doesn't really interest me, he did say some really interesting stuff about improving general performance and SEO specifically in Nuxt.

He had a few main points that, according to him, influence how successful your e-commerce site is:

**Loading unneeded code**

If you have components that don't need to load immediately, you can add the [lazy prefix](https://nuxt.com/docs/guide/directory-structure/components#dynamic-imports) to components to dynamically import them whenever you feel is right. This would look something like this:

```json
<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

*Source: *[*https://nuxt.com/docs/guide/directory-structure/components#dynamic-imports*](https://nuxt.com/docs/guide/directory-structure/components#dynamic-imports)* *

**Unoptimized scripts**

There is a Nuxt module called [NuxtScripts](https://scripts.nuxt.com/) that can be used to optimize 3rd party scripts. One of the way to do so, is by adding `trigger: 'manual``  to the script you're adding. This way you can decide when this script will be loading, instead of having it load immediately.

```javascript
const { load } = useScript('https://example.com/script.js', {
  trigger: 'manual'
})
// ...
load()
```

*Source: *[*https://scripts.nuxt.com/docs/guides/script-triggers#manual-trigger*](https://scripts.nuxt.com/docs/guides/script-triggers#manual-trigger)* *

**Unoptimized images**

Badly optimized images can negatively impact your performance. And ofcourse, there's another Nuxt module for that!

[NuxtImage](https://image.nuxt.com/) is a module that helps you with image optimization by using the `<NuxtImg>`  component. With this you can enable lazy loading like you would natively. You can set the width and height and densities as well.

**Blocking client side navigation**

UseFetch blocks navigation until its async handler is resolved. Nuxt offers the [useLazyFetch](https://nuxt.com/docs/api/composables/use-lazy-fetch) composable, which instead triggers the navigation immediately. This can also be useful to add loading states that check whether or not the data is fetched yet.

```javascript
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
 * Handle 'pending' and 'error' states directly within your component's template
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // Because posts might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>

```

*Source: *[*https://nuxt.com/docs/api/composables/use-lazy-fetch*](https://nuxt.com/docs/api/composables/use-lazy-fetch)

**Lack of control over JS hydration**

In Nuxt, you can use lazy or delayed hydration to control when components become interactive. You can do this by adding `hydrate-on-visible` which means the component hydrates when it enters the viewport. You can also use `hydrate-on-interaction`  which triggers component hydration on (for example) mouseover, and there are several more options you can use as documented [here](https://nuxt.com/docs/guide/directory-structure/components#delayed-or-lazy-hydration).

```javascript
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>

```

Source: [https://nuxt.com/docs/guide/directory-structure/components#hydrate-on-visible](https://nuxt.com/docs/guide/directory-structure/components#hydrate-on-visible)

The only thing that may hold me back from using this, however, is that lazy hydration is only supported in single-file components. In my case, I always use multiple files.

Jakub also talked a little about SEO improvements such as the [sitemap module](https://nuxt.com/modules/sitemap) for generating sitemaps in XML, SEO Meta through the composable `useSeoMeta` in which you can define meta tags ([docs](https://nuxt.com/docs/api/composables/use-seo-meta)), a [robots.txt](https://nuxt.com/modules/robots) module to configure robots crawling your site, and defining OG images using the `defineOgImageComponent()` from the [NuxtSEO module.](https://nuxtseo.com/)

In general, I think Jakub's talk was the highlight of the day for me.

### Utilizing Vue and Nuxt to make micro services

By [Reza Ranjbar](https://www.linkedin.com/in/rebaar/)

Reza is a developer working at [Funda](https://www.funda.nl/) who had a talk about Micro Frontends.

What it basically came down to, is that by breaking down our application into smaller parts, you can drastically improve your deploys. For example, in Funda, they separate several pages into "verticals" which are their own standalone Nuxt applications. These are then imported as packages into the main project. This way, when you update something, the pipeline only takes (in the case of Funda) 6 minutes!

You can read more about micro frontends in [this article](https://www.funda.nl/).

![](../../assets/img/blog/vue-conference-2025/funda.webp)

### Being a 10x developer is not what you think it is

By [Filip Rakowski](https://www.linkedin.com/in/filip-rakowski-a43671129/?originalSubdomain=pl)

Filip is the co-founder and CTO at [Alokai](https://alokai.com/). During his talk, he spoke about the current job market for Vue developers and whether or not to be worried about the rise of AI. He gave us some tips to become a better developer to make sure you'll always be able to land a job.

> Great developers will always be in high demand

- **Understand business**
  
  - Many developers don't really know how the company they work for makes money and why customers choose that company instead of competitors. By understanding this, you have a clearer goal in mind when you write your code.
- **Be a pragmatic problem solver**
  
  - Don't blindly complete tasks. Instead, take some time to find a better way to solve something that increases efficiency and simplicity.
- **Return of investment**
  
  - Is what you're working on a good investment? Is it a worthy investment of your time, or is there a better alternative?
  - Writing code isn't always the best way to go about something. Maybe it's better to instead write docs or offer training.
- **Take ownership**
  
  - Make yourself dependable. Own the code you write and be responsible for it so you become a more reliable developer.
- **Collaborate with other teams**

## Conclusion

There were a couple of other talks during this conference day that I haven't talked about, mainly because they weren't relevant for me or I was fighting my post-lunch dip while sitting through four talks in a row.

All in all, I'm happy I was invited to go to this conference, and it's sparked my motivation to dive into Nuxt a bit more. I am currently planning on reworking my portfolio (again), in which I will be using Nuxt 4 features and TypeScript, and I will be looking at these talks when it comes to performance and SEO improvements.

Bye!
