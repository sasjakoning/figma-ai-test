---
title: Finding out about the birds in our garden using BirdNET-Pi
parent: blog
date: 2026-06-01
description: Using a Raspberry Pi 4B, USB microphone and BirdNET-Pi to learn about the birds in our garden.
---

A while ago I read [this post by Vasilis](https://vasilis.nl/nerd/2026/the-birds-in-our-garden/) where he set up Birdnet on a Raspberry Pi to track the types of birds in his garden.

Later, I mentioned this to my mom since she's interested in birds and she was pretty excited about the idea so I decided to set it up.

## The hardware

The hardware of this is pretty simple. I ordered [this](https://www.amazon.nl/Fyvadio-USB-lavalier-microfoon-omnidirectioneel-reversspeld-microfoon/dp/B0BZNJSMVM/ref=sr_1_5?crid=1G6ZL0TDMHY7O&dib=eyJ2IjoiMSJ9._TitWmzRekLmSHTuIEPmrTCp8Pu2j5sEaVi9B7pEF3xa8Mv3Qi-BqYXEE3zy96AhQJ-zXcTJcxOP1TYqZWj0Nb17FgDpqWDVzGjoQUMvrYoco9R1Zaav6aDv05jP3qmLXVXr83cZSk6CUNtxs_Wput8IDKEOT7d4HGPns_Qai10zT1_ngSqgynfIkVOx_biq8Oz64TDFQEKVVAFrqZcpso2ydqXHb0E9orU4kzo3Wc92DzY6VwSSw279XFtizgfWF9EN1kdYgOy7WqqMzgAWAJTuJq9tI7CiJ4pym0P8Ses.z6mVQJK41dc_lguxBV5p_ly-6ShSKHwmUpivE_v2BGo&dib_tag=se&keywords=lavalier+usb+microphone&qid=1780300180&sprefix=lavalier+usb%2Caps%2C164&sr=8-5) cheap USB microphone from Amazon and already had a Raspberry Pi 4B laying around. I wasn't planning on making this very permanent and the weather happened to be nice so I simply stuck the microphone out of the window and have the Raspberry inside on the windowsill.

<div class="image-grid" style="--columns: 2;">
  <img src="../../assets/img/blog/finding-out-about-the-birds-in-our-garden-using-birdnet-pi/raspberrypi.webp" alt="Hand holding a Raspberry Pi with Ethernet and USB plugged in">
  <img src="../../assets/img/blog/finding-out-about-the-birds-in-our-garden-using-birdnet-pi/microphone.webp" alt="A small USB microphone hanging outside a window">
</div>

## The software

I installed [BirdNET-PI](https://github.com/Nachtzuster/BirdNET-Pi) on the SD-card of my Raspberry, which was pretty easy to do. The instructions are a little jumbled as they're divided between two different repositories but it's clear enough if you pay attention.

Once everything was installed it automatically hosted a GUI on birdnetpi.local which I could access from my network.

## The results

These are the results after running the software for about a week:  
![A graph showing the amount of bird sound detections and the bird related to it. Winterkoning is most common.](../../assets/img/blog/finding-out-about-the-birds-in-our-garden-using-birdnet-pi/result.webp)

It's done a total of 24347 detections, of which it found 71(!) different bird species. The majority of noise comes from the Winterkoning(Wren) which is a really cute tiny bird. It doesn't show up as high but I feel like the pigeon/dove is very common here as well(We have some really fat ones that take giant dumps on our porch).

And it visually displays peaks like so:

![A graph showing peaks in audio](../../assets/img/blog/finding-out-about-the-birds-in-our-garden-using-birdnet-pi/graph.webp)And makes recordings as well.

Pretty neat.

You can create a bunch of fun automations with this tool, but for now I'm content as is. It's making my mom happy so it's a win.
