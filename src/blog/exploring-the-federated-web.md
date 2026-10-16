---
title: Exploring the federated web
parent: blog
date: 2026-05-01
description: Exploring the federated web, decentralisation, the Fediverse and Mastodon.
---

A while ago I attended an event called "The Web You Want", where several speakers had talks about the web they wanted, such as a fun, safe, or sustainable web.

Something that came up more than once was the "Atmosphere" and the "Fediverse". I had vaguely heard of those terms before but never really looked into it much. But I've been looking for a nerd community for a while now, and I think many of them are in those spaces, so I decided to dive into it.

## Centralised, decentralised... What?

Originally the web was designed as a decentralised space. Meaning that a network of machines can be connected to each other without a central administration. And for the most part that's still how it is. The internet is a network of networks, a giant web.

![Illustration of the decentralised web](../../assets/img/blog/exploring-the-federated-web/decentralised.webp)

However, over the past years the internet has seemingly become more centralised. Think about how a Cloudflare outage affected such a large part of the internet and how companies such as Meta own large platforms like Facebook, Instagram and WhatsApp.

![Illustration of the centralised web](../../assets/img/blog/exploring-the-federated-web/centralised.webp)

## The Fediverse

The [Fediverse](https://en.wikipedia.org/wiki/Fediverse), a combination of "Federation" and "Universe", is a decentralised and interconnected network of social media platforms and websites using the [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub) protocol. ActivityPub is the most common protocol, used by social media such as [Mastodon](https://en.wikipedia.org/wiki/Mastodon_(social_network))(Similar to X), [Pixelfed](https://en.wikipedia.org/wiki/Pixelfed)(Similar to Instagram) and [PeerTube](https://en.wikipedia.org/wiki/PeerTube)(Similar to YouTube).

There are other protocols as well, such as the [AT Protocol](https://en.wikipedia.org/wiki/AT_Protocol) which is used by platforms such as [Bluesky](https://en.wikipedia.org/wiki/Bluesky).

The main thing about the Fediverse is that platforms can be run by individuals on their own servers, in which case they're called instances.

For example, someone could have an account on a Mastodon instance called Domain1, and someone else could have an account on Domain2. But both can interact with and follow each other, as the instances can communicate using the ActivityPub protocol. I'll explain my experiences with this later in this post.

## Why would you want this?

More and more people are becoming fed up with large platforms such as Instagram and X. They're owned by people that can't be trusted, and the algorithms cause political bubbles and polarisation. The Fediverse is nothing like all that. It's made for and by the people and contains no algorithms and ads. Your timeline is yours, based on the people and tags you follow.

## Trying it out for myself

Personally I'm a frequent user of X and TikTok and have quite the history of posts on Instagram. I'm not really interested in leaving those platforms (yet), but I *am* interested in a free and safe web. So I decided to create an account on Mastodon focused on some of my more nerdy interests such as development and homelabbing.

Initially I wanted to join the [front-end.social](http://front-end.social) instance, as I am a front-end developer, but their applications are closed currently. Instead, I joined [waag.social](http://waag.social) which is hosted by [Waag Futurelab](https://www.waag.org/nl/), which is a nice and welcoming space as well.

### Account creation

Creating an account was pretty simple: just fill in some info and done. Your account then lives inside the Mastodon instance you're in. In my case, my account is [@](https://waag.social/@sasja)[sasja@waag.social](mailto:sasja@waag.social). Someone in the front-end.social instance would be called @person@front-end.social.

### The feeds

Once logged in, you can click on "Live feeds", which shows you public posts in your own instance, in the first place. This means that any public posts from users with an account on (for example) [waag.social](http://waag.social) show up here.

There's another tab there called "Other servers", which is pretty interesting. That feed shows you public posts from people on the Fediverse that people on your instance follow.

For example: If @user1@waag.social follows @user2@mastodon.social, and you yourself are on waag.social as well, posts from @user2@mastodon.social show up in this timeline.

It might seem a little weird. Why not just show posts from ANYONE in the Fediverse? That's the thing about how instances communicate with each other.

Your instance only knows about other instances through interactions. Like when someone follows, boosts, or replies to a user on that other instance. There's no global record of all instances in the world.

### Following people

Following people was a bit of a hurdle for me. You can't just use the search bar and type in their name, except if you fill in their full name, including their instance. What I ended up doing was simply looking up people using Google and adding "Mastodon" to the search query.

Googling users will in most cases take you to their profile on *their* instance, though, so @user2@mastodon.social would be on mastodon.social/@user2. That's where it gets a little weird.

People you follow have to be handled by your *own* instance. So clicking "Follow" in someone else's instance doesn't *follow* them right away. It first asks you to enter the account you want to follow them from and then redirects you to your own instance to complete following them.

So the flow is:

1. Find someone's profile (in my case through Google)
2. Click "Follow" on their instance and enter your handle.
3. Get redirected to your own instance
4. Click "Follow" again to confirm.

It's a little iffy but makes sense once you understand how the different instances communicate.

But eventually I figured it out and follow about 50 people now, so my feed is nicely populated.

### My experience up till now

I've been using Mastodon for a little while now, and I've been enjoying it so far. I managed to create a space in Mastodon focused on my nerdy side, which is inspiring and motivational. Whenever I'm working on something new, I post about it, and sometimes people interact as well!

Apparently hashtags are a major part of communication in Mastodon. Probably because you can follow them, which makes related posts show up on your feed. I posted something about LoRa meshes and how I was planning to use it with Meshtastic. Then someone recommended MeshCore, which turned out to be much better for my use case. Nice!

Only time will tell if I continue using it, but for now I'm pretty content.
