---
title: Building a Secure Home Server with Jellyfin, HA, Docker & Tailscale
parent: blog
date: 2025-07-29
description: My journey from Plex to building a robust & secure home server. How I set up Jellyfin, Home Assistant, Zigbee2MQTT, Docker, and Tailscale on Ubuntu.
---

For a while now, I've been using Plex on my dad's WD Mycloud EX2 Ultra to stream movies and shows that I've (very legally) downloaded from the internet.

However, [Plex has changed the way remote streaming works](https://www.plex.tv/blog/important-2025-plex-updates/), which is now a premium feature instead of free. For me this is a problem since I have friends and family that use my Plex server remotely and I don't want to pay for it.

Due to this I decided to quit [Plex](https://www.plex.tv/) and switch to [Jellyfin](https://jellyfin.org/) which is free and open source, but generally more difficult to install especially on an ancient device such as the WD Mycloud.

And thus begins my journey in setting up my home server...

## The goal

I wanted to create a home server which would run [Home Assistant](https://www.home-assistant.io/) + [Zigbee2mqtt](https://www.zigbee2mqtt.io/) and [Jellyfin](https://jellyfin.org/). And I wanted everything to be remotely accessible using [Tailscale](https://tailscale.com/). And in general I just wanted to tinker with home automation and Linux.

## The computer

I no longer wanted to rely on the janky software the WD MyCloud offers, so I decided to look for a cheap, second-hand computer I could use. After some research, I found a **Dell Optiplex 3060** mini PC on Marktplaats, which was perfect for what I had planned, and only 60 euros.

When the computer arrived, it came with Home Assistant pre-installed. While I was interested in migrating my (then) current HA setup to this computer (it was running on a Raspberry Pi at the moment), that version of HA was the Home Assistant OS, which wouldn't do for what I had planned.

## Installing Ubuntu

I had never before worked with anything Linux related so take this section with a grain of salt.

After some research I learned that my best options were probably either [Debian](https://www.debian.org/) or [Ubuntu](https://ubuntu.com/). When I looked online, it seemed like Debian is the most lightweight and offers the user the most freedom. But I was running into some issues during installation (which, in the end, was due to a faulty USB drive...), so I switched to installing Ubuntu, which went more smoothly.

Once I had Ubuntu installed, I was met with a nice interface that I played around with a little before I realised I shouldn't have a GUI for my server setup. Turned out it should've installed [Ubuntu Server](https://ubuntu.com/server) instead of Ubuntu Desktop. So I went back again, put Ubuntu Server on the USB drive and booted the Dell using that.

## Docker

To run the different applications I used [Docker](https://www.docker.com/), which I've been using consistently at work, but had never delved into much. I would simply run the commands required to get my projects running and leave it at that.

This means that using Docker on my server would be a good learning opportunity. After messing around a bit, I decided that it's best to use a single `docker-compose.yml` file which holds the settings required to get everything running.

## Directory structure

This is the directory structure I went with:

```

└── ~/home-automation/
    ├── docker-compose.yml
    ├── homeassistant/
    │   └── config/
    ├── jellyfin/
    │   ├── cache/
    │   └── config/
    ├── mosquitto/
    │   ├── config/
    │   ├── data/
    │   └── log/
    └── zigbee2mqtt/
        └── data/
```

This way, everything would be in a central location, instead of all over the place. the one exception was my media folder which would live in `root/media/mycloud/`.

## Mounting media from a network drive

The media that I wanted to stream through the Dell is hosted on a [WD Mycloud EX2 Ultra](https://www.westerndigital.com/nl-nl/products/network-attached-storage/wd-my-cloud-expert-series-ex2-ultra?sku=WDBVBZ0000NCH-EESN). Instead of physically attaching an external harddrive to the Dell I opted to still use that WD Mycloud setup. To do so, I created a folder `root/media/mycloud` and mounted the network drive to it by running something similar to this:

`sudo mount -t cifs //SERVER_IP/SHARE_NAME /media/mycloud -o username=YOUR_USERNAME,password=YOUR_PASSWORD,vers=3.0`

However, this was a little insecure and to make sure this mounting would always happen on boot, I added it stored my credentials and added this to `/etc/fstab`

`//[WD Mycloud IP / folder] /media/mycloud cifs credentials=[Path to my credentials],uid=1000,gid=1000,vers=3.0,nofail,x-systemd.automount 0 0`

For my credentials file, I also had to make sure the permissions were set up so only the assigned user can access the file.

`sudo chmod 600 /path/to/credentials_file`

(chmod changes the mode of the file aka permissions. 600 stands for 6 - the owner can read and write, not execute. 0 - the group can't do anything. 0 - the others can't do anything.)

And just like that, I could easily access the data on my WD Mycloud through my Dell.

## Installing Jellyfin

Installing Jellyfin was pretty easy. To my `docker-compose.yml` I added:

```
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    user: 1000:1000
    volumes:
      - ./jellyfin/config:/config
      - ./jellyfin/cache:/cache
      - /media/mycloud:/media
    ports:
      - 8096:8096
    environment:
      - TZ=Europe/Amsterdam
    restart: unless-stopped
```

- The image uses the official Jellyfin Docker image
- The user being 1000:1000 is equal to the main Linux user
- The volumes are equal to the files I set up in the directory structure + the mounted network drive.
- The ports are equal to the default for the Jellyfin web interface which means I could access it by using my IP + the port.
- The environment sets up variables for the timezone
- And the restart: unless-stopped makes sure Docker will always restart the container unless manually stopped.

Once saved, I ran `sudo docker compose up -d` in which 'up' will (re)create and start the containers and -d makes sure it runs in 'detached' mode so I can continue using the terminal which the services run in the background.

Then I could visit the Jellyfin frontend through the IP+port and set everything up by selecting my media folders and done!

![](../../assets/img/blog/building-a-secure-home-server-with-jellyfin-ha-docker-tailscale/jellyfin.webp)

## Installing Home Assistant

I already had Home Assistant(HA) running on a Raspberry Pi, but figured it would be nice to reduce the amount of devices used and switch HA to my Dell.

Something I noticed though, was that by running Home Assistant as a container on Linux, it couldn't use any Add-ons which I used to connect all my lights using Zigbee2mqtt. I had to separately install these.

### Installing Zigbee2mqtt

Instead of just using Zigbee, I opted to use Zigbee2mqtt which allows Zigbee to communicate with MQTT-enabled platforms. This means that I can connect to many more devices than I would've with just Zigbee. For example, at home we have a bunch of Philips Hue lights, but also off-brand lights and smart plugs which aren't automatically supported. Zigbee2mqtt solves this problem.

To install it, I added the following to the docker-compose.yml file:

```
services:
	[other services...]
  zigbee2mqtt:
    image: koenkk/zigbee2mqtt
    container_name: zigbee2mqtt
    volumes:
      - ./zigbee2mqtt/data:/app/data
    devices:
      - /dev/serial/by-id/[Name of my USB dongle]:/dev/ttyUSB0
    depends_on:
      - mosquitto
    restart: unless-stopped
    environment:
      - TZ=Europe/Amsterdam
      // Secrets for Mosquitto
    ports:
      - 8080:8080
```

- Port 8080 refers to the frontend interface of Zigbee2mqtt which offers a web dashboard.

At this point I started running into some issues where there was a mismatch between the mapping of the dongle. In some cases it was mapped to `ttyUSB0` and in other cases to `ttyACM0`. I eventually solved this by ensuring the mapping was correct by running `ls -l /dev/serial/by-id/` which lists the contents of the directory and shows detailed information. Then I'd make sure the same mapping was set in `docker-compose.yml` and `/zigbee2mqtt/data/configuration.yaml`.

### Installing Mosquitto

To make sure Zigbee2mqtt and Home Assistant could communicate with each other, I installed Mosquitto. To run this I added it to to `docker-compose.yml` like so:

```
services:
	[other services...]
  mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
    ports:
      - 1883:1883
      - 9001:9001
    restart: unless-stopped
```

and in `mosquitto/config/mosquitto.conf`:

```
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
listener 1883
password_file //secret
```

- Persistence true saves the state of mosquitto so it can recover after a restart
- Persistence_location sets the location where the data will be stored
- log_dest sets the file where logs are stored
  
  Listener sets the port 1883 which is the default port used by MQTT. Zigbee2MQTT and Home Assistant use this to send and receive MQTT messages.
- I did some authentication stuff which I won't dive into due to obvious reasons.

### Setting up Home Assistant

Now, I was able to continue setting up Home Assistant. From my old setup, I downloaded a backup file which carried over many settings already. When I loaded Home Assistant with the backup it already had my dashboard set up and a bunch of devices and services were already working. My lights setup wasn't, though, since that originally used an add-on.

The data I had originally for all the lights wasn't there, which I dreaded since I really didn't feel like manually connecting all the lights and plugs again.

However, after some research I managed to grab the old `coordinator_backup.json`, `database.db` and `state.json` files from my previous Zigbee2MQTT setup and add them to my current setup. I had to update some values in the `configuration.yaml` in Zigbee2MQTT but after that everything worked perfectly again!

## Installing Tailscale

Since the entire reason for creating a home server was because I could no longer use Plex remotely, I of course needed to set up remote access for my server.

On my previous Raspberry Pi setup I used Tailscale to connect to HA remotely which I had a positive experience with so I decided to use that again.

I did consider switching to a manual set up but networking, DNS, port forwarding and so on scared me a little, and I preferred not touching our (already fragile) internet setup. I might look into it in the future, though.

Installing Tailscale was done a little differently since that's best installed directly on the OS instead of with a container.

this is what I ran:

```
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Which installed Tailscale and ran it immediately. Then I was prompted to open the web interface which required me to authenticate. Then, on my Tailscale dashboard I removed my old HA connection and set the new one up as the exit node. and that's it. Now I could connect to Jellyfin and Home Assistant using the Tailscale IP+ports from anywhere as long as I was connected to Tailscale.

## Securing my server with a firewall

I wanted to make sure my server was secure so I decided to set up a firewall. Ubuntu Server has UFW- Uncomplicated Firewall - which I used for this purpose.

I made sure all incoming connections are blocked by default, and all outgoing connections are allowed:

```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Then I added a couple of rules to `ufw` such as allowing SSH (Important first step if you're accessing your server through SSH to avoid getting locked out) and the ports associated with Jellyfin, Zigbee2MQTT, Mosquitto and Home Assistant.

Then I simply ran `sudo ufw enable` and I had a firewall running.

## Make sure everything restarts automatically

The last step to set everything up was to make sure everything restarts automatically whenever the Dell restarts due to crashes or power outages.

For docker I ran `sudo systemctl enable docker` and in the `docker-compose.yml` I had set up `restart: unless-stopped` for everything which makes sure it restarts automatically.

Finally, I did the same for Tailscale: `sudo systemctl enable tailscaled`.

## Final thoughts

After having set all of this up, I can say that I've had a surprising amount of fun doing this. Everything went a lot smoother than expected which means it only spent about a day working on everything.

During this, I decided to test out the full extent of Dia, which is an AI powered browser. This helped me out a ton since I could open documentation pages and ask for help with the relevant context. this meant that instead of digging through docs, I could tell Dia my setup and have it list the steps for me.

I certainly couldn't depend entirely on AI though, since general tech knowledge was still required to get everything set up. Luckily I already work in terminals quite often so I was pretty comfortable working with Ubuntu Server.

In the end I learned a ton about Linux and Docker, and now feel quite confident in my abilities when it comes to techy stuff like this. Later on I might look into hosting more stuff on this server like my website or a game server. We'll see.
