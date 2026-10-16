---
title: Setting up Home Assistant in my house
parent: blog
date: 2025-04-04
description: My experience switching from several smart devices and apps to one central system.
---

Recently, I've switched my smart home setup to work with Home Assistant. For personal reference and support for anyone I convince to use Home Assistant as well, I've decided to make a blog post about it. Let's get into it!

## What is Home Assistant?

> **Home Assistant** is free and open-source software used for home automation. It serves as an integration platform and smart home hub, allowing users to control smart home devices. The software emphasizes local control and privacy and is designed to be independent of any specific Internet of Things (IoT) ecosystem.
>
> - [Wikipedia](https://en.wikipedia.org/wiki/Home_Assistant)

So basically, it's a central place for you to add all your smart home systems to so you don't have to use a million apps anymore. Which brings me to the next heading:

## Why did I decide to switch to Home Assistant?

Let me list all of the smart home devices and systems we currently have where I live:

- Lights
- Heating
- Solar
- Conditioning
- Google Assistant
- Cameras
- Television
- Robot vacuum
- Lawn mowers
- And probably more

And each of these has its own apps to control them. Which means you end up with a lot of different applications on your device that you probably don't even use very often or for just one thing. By setting up Home Assistant, you can connect all these devices to one single hub and app. Easy!

But the real reason I decided to switch was because I was fed up with the Philips Hue system. In case you don't know, Philips Hue lights use **Zigbee** to connect to a hub, which you can then use to control your lights.

About Zigbee:

> Zigbee is a standards-based wireless technology developed to enable low-cost, low-power wireless machine-to-machine (M2M) and internet of things (IoT) networks.
>
> - [TechTarget](https://www.techtarget.com/iotagenda/definition/ZigBee#:~:text=Zigbee%20is%20a%20standards%2Dbased,and%20is%20an%20open%20standard.)

And Zigbee isn't owned by Philips, which means that there are also other devices that can use it. However, when you're using the Philips Hue Hub, Philips doesn't allow all devices using Zigbee to connect. Some come through, such as the Ikea smart lights, but I bought a Zigbee smart plug from some random brand that refused to connect. So, "Damn you, Philips!" I said and started researching Home Assistant.

## The hardware

This is the list of hardware I bought to get this system going:

- [Raspberry Pi 4,  4GB RAM](https://tweakers.net/pricewatch/1414470/raspberry-pi-4-model-b-4gb-ram.html)
- [SONOFF Zigbee 3.0 Dongle](https://www.amazon.nl/SONOFF-EFR32MG21-CH9102F-Co%C3%B6rdinator-Universele/dp/B0B6P22YJC?dib=eyJ2IjoiMSJ9.xfFEitihTiGU5eql5n0JRSmt0Z3fEmR0pvCdepUvnE579WVcM7oidozQiFuTVGoDLLZqmpAuB7RtRoX_gEWWv08fJvG24bPgMA3cZqDlB8R9GCP6CPg7SW5RybtwxTmT5Q_Q4Bn_3cLawDGf3nlMixUgYxWr-E6uA6H9I5Sx0VKPJPjHo9BuMp_9aHmcknNjESQR0El-TR3Dd4rvIewuIEJCZCm-6nRdUTVDtJE6tLBcd18KZ3L-BsOZUmRk_md8e8XO76Uz4wkOoq9M42ciN8KJJz0rd2qX3ZZXY8Fn1x6oX6dn79kFjCMKloTnA_cpxZ0JsLaZXXESk0t1_WxmMX0h2T6gKqLyNk_NF5NkB5zh-3VRCDI5H7qLPH8PF389uZWMN7MvNWq6IaMN9ObqMwHoggjnHXxduyJRcXOk0aRIdGbGsUPJBCdxjhOr5X5A.KQAbQrM36afZWtiDMV8BDA5Nwe_888KhRgwYZKZ_kT0&dib_tag=se&keywords=sonoff%2Bzigbee%2B3.0%2Busb%2Bdongle%2Bplus-e%2Bgateway&qid=1738250650&sr=8-4&th=1)
- Generic sd card A2 64GB (May expand in the future)
- Power supply that supports Raspberry Pi 4

Which, in total, cost me around 110 euros.

Along with that, I already had an Ethernet cable and USB extender cable (apparently plugging the Zigbee dongle straight into the Raspberry causes radio interference) ready.

## Setting everything up

Once all the hardware arrived, it was time to set everything up. Which went both smoothly and terribly.

### Installing Home Assistant

Installing Home Assistant on the Raspberry Pi was surprisingly easy. Following the steps [here,](https://www.home-assistant.io/installation/raspberrypi/) I installed the Raspberry Pi Imager on my laptop, connected the SD card, and installed Home Assistant onto it.

After doing so, I put the SD card in the Raspberry Pi and connected a power supply to it and an Ethernet cable.

Once I've started up the device, shortly after I was able to connect to Home Assistant on my laptop using the local URL: [homeassistant.local:8123](http://homeassistant.local:8123/).

Then it was just a matter of going through the installation steps through Home Assistant, and done!

#### YAML

As a bit of a side note, most of Home Assistant can be controlled using YAML. The UI you see through the frontend is simply a more (noob) user-friendly way to configure HA. For most settings, such as cards and automations, you can instead switch to the YAML configuration and edit settings through code.

### Devices showed up automatically

Some devices showed up in Home Assistant almost instantly. Since HA is connected to my home network, it started looking for smart devices sharing the same network immediately. These were devices such as my television, Chromecast, solar panels, and so on. All I had to do was approve them, and they were integrated. Cool!

### Switching from Philips Hue

One of the biggest challenges I've had while setting up Home Assistant was switching from Philips Hue. Originally we had a Philips Hue Hub set up to which all the lights were connected. Using the original Sonoff Zigbee integration, I was trying to add them, but this proved itself to be quite difficult. First off, I had to remove a light from Hue; then I had to reset it somehow and then hope Sonoff would detect the device and add it.

Well, it turns out resetting Hue lamps is an awful experience. I had to do some Googling, and to reset a lamp, I'd have to follow these steps:

- Turn off the bulb for 5 seconds (from the wall or lamp)
- Turn on for 8 seconds
- Turn off for 2 seconds
- Turn on for 8 seconds

What the hell. This ended up being some Morse code language or something because I couldn't manage to do it correctly at all. And then the idea of having to do this to all 10+!!! lamps was quite discouraging.

After doing some more professional Googling, I learned that many people are using the [Zigbee2MQTT](https://www.zigbee2mqtt.io/) Add-on. It uses the MQTT protocol to communicate with other devices more easily.

> MQTT is an OASIS standard messaging protocol for the Internet of Things (IoT). It is designed as an extremely lightweight publish/subscribe messaging transport that is ideal for connecting remote devices with a small code footprint and minimal network bandwidth. MQTT today is used in a wide variety of industries, such as automotive, manufacturing, telecommunications, oil and gas, etc.
>
> - https://mqtt.org/

Getting this up and running did require some in-depth docs reading and additional add-ons such as the Mosquitto Broker and MQTT itself, but eventually it got it working, and it made it way easier to find Zigbee devices. This is what I had to do to add Hue devices to Home Assistant:

1. Remove the light from the Hue app.
2. If you see the light flash, you've removed it successfully.
3. Turn on "Allow devices to join" in Zigbee2QMTT in Home Assistant.
4. The light SHOULD show up.
5. Add it, and done!

I had to repeat this for each lamp, which was still a bit of a hassle, but in the end I got it all working and was able to remove Philips Hue entirely.

### Automations

Once I had all the lights integrated into Home Assistant, I wanted to set up some automations for them. My goal was to turn on the lights twenty minutes before sunset and turn them off around 22:30, when everyone is off to bed. Along with that, I wanted the lights to turn on again around 7:20, with the exception that they may only turn on if the sun hasn't risen yet. And if they're on, turn them off at sunrise.

To make it easier for myself, I added the [group integration](https://www.home-assistant.io/integrations/group/), which I could use to group my lights. This was useful for me because I wanted to control the table lights separately from my living room lights.

Setting up the automations was relatively easy to do. I simply added a new automation in HA and added the needed settings. As it turns out, setting up an automation works similarly to writing an if-else statement. So, for example, to turn on the lights in the evening:

```javascript
if (currentTime === (sunset - offset)){
    lights.value = true;
};
```

And to turn on the lights in the morning:

```javascript
if ((currentTime === setTime) && !sunrise){
    lights.value = true;
}
```

Which looks something like this in the Home Assistant UI:  
![](../../assets/img/blog/home-assistant-setup/automation-example.webp)And like this in the YAML:

```yaml
alias: Ochtend light aan
description: ""
triggers:
  - trigger: time
    at: "07:20:00"
conditions:
  - condition: sun
    before: sunrise
actions:
  - action: light.turn_on
    metadata: {}
    data:
      brightness_pct: 80
    target:
      entity_id: light.eettafel_group
mode: single
```

### Setting up my cameras

Setting up the cameras we use at home was a bit of a challenge. At home, I have a camera in the living room (we have a sneaky dog, okay?) and outside attached to our garage. The brand of both cameras is Foscam. Which, as it turns out, already has an integration for HA available [here](https://www.home-assistant.io/integrations/foscam).

You'd think it would be quite easy to add the cameras in that case, but not really. Let's start with the camera in our living room.

When I added the camera through the integration, it did show up correctly, but it wasn't able to play the livestream. Instead, it would show a single screenshot of the camera from the moment you opened the HA dashboard. I've had to scour the internet for any hints as to why it doesn't work correctly, visiting forum posts such as [this one](https://community.home-assistant.io/t/foscam-after-integration-2021-2/276499/23) and [this one](https://github.com/home-assistant/core/issues/130162). Eventually I managed to get the camera stream working by going into the camera settings (by visiting the IP address of the camera) and turning on ONVIF, which dealt with the RTSP port.

The outside camera proved itself to be even more difficult, though.

The way my home network is set up is as follows:

```javascript
Modem > Home Router > Garage Router
```

This means that Home Assistant and the outside camera are not connected to the same network.

What I tried to do first was set up a site-to-site VPN. This turned out with me bricking our home network to the point where I had to factory reset it so I could access it again. Fun!

After that, I found out that, since the garage router is getting internet from our home router, I could instead just set up a static route. Which means that the two routers could communicate with each other freely. This eventually worked, and I was able to add the camera to HA. Then, I again had issues streaming the camera feed through HA, but it wasn't the same as the living room camera. I did have a livestream, but it updated only once every two seconds. I tried adjusting the RTSP port in this camera as well, but for some reason the setting isn't there.

This is still an ongoing issue, and I've decided to just wait for new Foscam integration updates.

### Remote access

Since Home Assistant runs locally, you won't be able to access it remotely without some configuration.

There are several ways to set up remote access, some paid and easy, some free and less easy. Since I'm a cheapskate and already spent over a hundred euros on hardware, I decided to go the free route.

I learned that [Tailscale](https://tailscale.com/) is a pretty good way to enable remote access for HA.

> Tailscale makes creating software-defined networks easy: securely connecting users, services, and devices.
>
> - [Tailscale.com](http://Tailscale.com)

Tailscale is basically a VPN hosted on your Home Assistant device that you can connect your external devices to. I simply had to install the [Tailscale Integration](https://www.home-assistant.io/integrations/tailscale/) on HA and follow the steps through there. Now, if I (for example) want to access HA externally on my phone, I simply turn on Tailscale through the app and open Home Assistant using the IP provided by Tailscale. Pretty easy, for me at least. For my parents, who use HA as well, it may be a little more difficult. Especially since you have to switch 'servers' when you're at home. I may look into more user-friendly ways to do so in the future. For now, this will suffice.

## What everything looks like now

So, I've had this blog post lying around for a while since I ran into an issue with the air conditioners not displaying properly. I still haven't fixed that, but it's a waste to keep this post unpublished still. So here's what my Home Assistant environment looks like right now!

![](../../assets/img/blog/home-assistant-setup/home-assistant-layout.webp)
