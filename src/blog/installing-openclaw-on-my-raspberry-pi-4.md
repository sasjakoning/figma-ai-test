---
title: Installing OpenClaw on my Raspberry Pi 4
parent: blog
date: 2026-02-23
description: Installing the quite dangerous tool OpenClaw onto my Raspberry Pi 4 for fun.
---

([Image credit](https://openclaw.ai/blog/introducing-openclaw))

If you're in the tech world like I am, I'm sure you've already heard about OpenClaw. Or Clawdbot or Moltbot. As of writing this it's OpenClaw.

Or, you might have watched the talkshow Eva lately which presented a demo of OpenClaw in use.

Either way, this tool is quickly rising in popularity and I too have been influenced to try it out.

> First off, I feel the need to disclaim that this tool is ***not*** safe at all. If you do not have at least some level of technical knowledge you really shouldn't play around with this. You could end up downloading malware and lose all your private info.

Anyway; I have it running :D

## The hardware

I had a Raspberry Pi 4 Model B laying around that I installed a fresh copy of the Raspberry Pi OS Lite on. I was planning on accessing the Pi through SSH so installing the full OS that includes a GUI wasn't needed for my case.

## Tailscale (optional)

Once I had that running I installed Tailscale on it so I could access the Pi remotely, which was mostly needed because my home has a double NAT situation going on. If your Pi simply runs on your own network you can probably skip this.

## Installing OpenClaw

Once I managed to ssh into the Pi using it's IP and credentials installing OpenClaw was pretty simple.

> It wasn't simple for me. But now that everything is running I have a much better understanding of the tool so if I were to redo it, it would be pretty simple indeed.

In my case I got NPM running and used it to run this: `npm i -g openclaw`

OpenClaw would install itself nicely, checking what dependencies it needs and if anything is already installed or not. Then it would guide me through some steps:

Choosing the model/auth provider: For this I picked OpenAI which I already had 5 euros prepaid setup on. So I only had to insert the api key and it was taken care of. Then I picket a model that wouldn't be too expensive to play around with.

Then there were a bunch of steps I skipped such as certain skills and api keys of things I wasn't going to use.

Finally it prompted me to test out the AI, which I did through their TUI. And it worked!

A helpful resource was [this](https://learn.adafruit.com/openclaw-on-raspberry-pi/installing-openclaw) article.

## Discord

The whole thing with OpenClaw is that you can add it as a bot to nearly any chat app you want. In my case I wanted to add it as a Discord bot.

To do that, I used [this](https://lumadock.com/tutorials/connect-openclaw-to-discord) article as a reference.

After setting up everything on the outside, all I had to add to openClaw was this inside the OpenClaw config:

```
{
  "channels": {
    "discord": {
      "enabled": true,
      "dm": { "enabled": false },
      "guilds": {
        "YOUR_GUILD_ID": {
          "requireMention": true,
          "channels": {
            "YOUR_CHANNEL_ID": { "allow": true, "requireMention": true }
          }
        }
      }
    }
  }
}
```

Specifically the guilds section lets openClaw know what server and channel it is in, and what it's allowed to do and respond to.

Then I ran `openclaw gateway` which starts the AI and the bot works!

![](../../assets/img/blog/installing-openclaw-on-my-raspberry-pi-4/pasted-image-20260206155814.webp)

## Connecting Google services

For fun, I decided to install the google cli and give OpenClaw access to my (unimportant) backup google account. With this, I could tell Berry (What I named the AI bot in Discord) to add something to my calendar, and it would work!

![](../../assets/img/blog/installing-openclaw-on-my-raspberry-pi-4/pasted-image-20260223143212.webp)

With this, I could also sent emails using Berry.

![](../../assets/img/blog/installing-openclaw-on-my-raspberry-pi-4/pasted-image-20260223143352.webp)

These emails did end up in the spam folder though. But I guess that makes sense.

## Thoughts

There's much more you can do using OpenClaw, and it can be as simple as just telling the bot to install something, as it has all the needed access and rights to install stuff and edit files. I just decided to keep it simple.

I had quite a bit of fun working on this little project, and I definitely think tools like this can become pretty big, especially once they become a little safer, as currently it's incredibly dangerous if you don't know what you're doing.

Personally I'll be disconnecting my Raspberry for safety, but will be keeping an eye on OpenClaw and similar tools to see where this goes.
