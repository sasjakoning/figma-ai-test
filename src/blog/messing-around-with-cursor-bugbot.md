---
title: Messing around with Cursor's BugBot
parent: blog
date: 2025-06-27
description: Cursor recently released BugBot; an AI bot that can check your Pull Requests for bugs. (Image from https://docs.cursor.com/bugbot)
---

I’ve been actively using Cursor for nearly a year now and have been keeping an eye on new features that could improve my workflow or simply pique my interest. Not long ago, Cursor released [BugBot](https://docs.cursor.com/bugbot).

BugBot automatically reviews pull requests for bugs and issues. You can now connect your GitHub to Cursor and select the repositories you want BugBot to check.

While I only use Github for my portfolio, I thought It’d be fun to mess around with it a little.

I set up a new branch in which I messed up some code on purpose:

```
export default defineEventHandler(async () => {

    const response = await fetch('https://api.counterapi.dev/v1/{endpoint }’)

    return null

})
```

The above would be weird to push since it returns null by default for a fetch.

```
console.log(undefinedVariable)
```

This one’s not great either…

I pushed the code and created a Pull Request and BugBot went to work right away. It does take about a minute or so to check, which seemed a little long for the two small edits I did. It makes me wonder how long it would take to check a larger Pull Request.

After it was done, it created a comment showing the issue(s) it found and explained why it was an issue. What I noticed is that it found the issue with the fetch but not the console log…

![](../../assets/img/blog/messing-around-with-cursor-bugbot/bugbot-1.webp)

A nifty thing that BugBot adds, however, is a link to fix it in Cursor right away. So when I clicked the link, it opened Cursor for me and immediately added the prompt to the chat window. All I had to do was press enter, and it fixed the bug. Cool!

![](../../assets/img/blog/messing-around-with-cursor-bugbot/bugbot-2.webp)

After I fixed that issue and pushed the changes, BugBot ran again. In this case it did find the console.log issue, but I still find it strange that it didn't find it earlier. Seeing how this tool will have usage-based pricing in the future, that's not great.

All in all, I probably won't be using this feature much, mainly because I don't use Github much anymore. Though, if this ever got support for Gitlab and I could convince my boss to use this... Could be very useful.
