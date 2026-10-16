---
title: Switching from Windows 11 to Linux Fedora KDE Plasma
parent: blog
date: 2026-06-09
description: My experience switching from Windows 11 to Linux Fedora KDE Plasma Desktop
---

On a whim I decided to switch my home PC from Windows 11 to Linux. I've been nerding out about stuff a lot lately and thought, why not go full nerd and use Linux?

I was already somewhat used to Linux through the [Ubuntu Server setup on my homelab](https://sasjakoning.com/blog/building-a-secure-home-server-with-jellyfin-ha-docker-tailscale), so the terminal in the context of Linux wasn't unfamiliar.

And because of SteamOS, gaming on Linux has become way better. Which was why I didn't switch to Linux sooner.

## Picking a distro

One of the toughest things (according to the internet) when it comes to Linux is picking the distribution that's right for you. There are many out there, such as Ubuntu, Debian, Arch (btw) and Fedora.

![Flowchart on how to choose a linux distro](../../assets/img/blog/switching-form-windows-11-to-linux-fedora-kde-plasma/choosing-a-linux-distro.webp)
*(credit: *[*https://www.linuxtrainingacademy.com/choosing-a-linux-distribution/*](https://www.linuxtrainingacademy.com/choosing-a-linux-distribution/)* )*

I decided to go for [Fedora](https://fedoraproject.org/) based on the following points:

- It's a popular and well-documented distro.
- It's pretty high up the list of distros for gaming according to the r/linux_gaming subreddit FAQ.
- And my brother uses it as well, so I can complain to him for fun.

I specifically chose the Fedora KDE Plasma Desktop over the Fedora Workstation as it's more customisable.

## Dual boot

Since switching to a different operating system is quite a big step, I first opted to dual boot Windows and Fedora. This meant that I could keep Windows on my PC as a backup while I messed around with Fedora.

I only ended up doing this for one day, though. Once I was confident I would enjoy Fedora, I ran a clean install.

## Installing Fedora

Installing Fedora was pretty simple. On Windows I installed the [Fedora Media Writer](https://docs.fedoraproject.org/en-US/fedora/latest/preparing-boot-media/#_fedora_media_writer). I then plugged in a spare USB drive and put the Fedora ISO on it using the media writer.

Then I restarted my PC, spamming DEL to get the BIOS screen, in which I selected the flash drive as my boot drive. From there (I did run into some issues, but they were flash drive-specific), I simply followed the steps.

A nice thing Fedora does is launch a live version of the desktop environment that you can play around with before deciding to fully install Fedora. But since I was already familiar with it from the dual-boot try-out, I decided to install right away. I pretty much only had to select the drive I wanted to use (my 1tb NVME SSD) and selected the option to overwrite existing content on the drive.

Then it spent no more than 5 minutes installing, and done! Fedora was running.

Besides that, I decided to format and convert my other drives as well so I could have a clean start, which was easy to do using [GParted](https://gparted.org/download.php).

## Personalising

While setting up Fedora I used [this guide](https://github.com/devangshekhawat/Fedora-44-Post-Install-Guide) to get some basics set up which were helpful. Besides that, I had some trouble getting Steam games to run, specifically ones that didn't natively support Steam OS. I tried playing Cairn but for some reason it wouldn't pick up my GPU. For cases like that, AI was very helpful.

I think most of the issues I ran into were just me learning about Fedora. Such as the discover "store" in which you can install "Flathub Flatpaks" which are apps running in sandbox environments which sometimes meant they couldn't access certain things on my computer.

Also, a weird issue with VLC media player in which I couldn't play videos from my SMB network folder, but once I permanently mounted that folder, it was fine.

## Looking forward

Right now I don't think I'll be switching back to Windows anytime soon. And I might end up becoming insufferable about Linux in the future.

I haven't had too much time to play around yet, as I only use my PC sometimes when I'm off, and besides that, I use a Macbook at work. But I'm pretty confident I'll be able to manage Linux just fine.

However, I do feel like Linux is still a bit too complex for non-techy people. There are more beginner-friendly distro's out there, but I wonder if you'll ever be able to avoid having to use the terminal, which is a big step for some people.

I do hope Linux becomes more mainstream, though, so we can get rid of those pesky commercial operating systems. Open source FTW.
