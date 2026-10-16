---
title: Using an old tablet as a Home Assistant dashboard
parent: blog
date: 2026-04-09
description: Using a motion sensor and Lenovo Tab to display my Home Assistant dashboard
---

Lately I've been more active trying to improve my home server setup. And a major part of this is Home Assistant.

Something I've wanted to do for a while now is to have a dashboard available at all times in our living room. And it just so happened I had an old Lenovo TB-X606F tablet laying around running on Android 10.

So here's how I set it up.

## The tablet

On the tablet I first turned off the lock screen, so the device could be opened instantly without needing a password or code. Then I installed Home Assistant as an app, which in terms of performance runs a lot smoother than using it through the browser.

For the HA app I had to set some permissions. These were the "Display over other apps" (So HA won't be considered a background app which could block notifications) and ""Allow background notifications" (To allow the `command_screen_on` to work.)

Then I set up the tablet on a shelf with a charger attached and that's it.

## The motion sensor

The motion sensor I bought on Amazon a while ago. I don't remember the brand but any Zigbee motion sensor should do.

I connected the motion sensor using Zigbee2MQTT which I use to connect all my Zigbee devices (See [here](https://sasjakoning.com/blog/building-a-secure-home-server-with-jellyfin-ha-docker-tailscale#heading-9)). By connecting it there, Home Assistant automatically discovered the device and exposed the `occupancy` entity.

## In Home Assistant

In Home Assistant I added an entry to `automations.yaml` with the following code:

```yaml
- id: '1757788310311'
	alias: Turn on tablet motion
	description: ''
	triggers:
	- type: occupied
		device_id: 4c1a8e4583ff758a30fea9e772858d9c # ID of motion sensor, can be found in the URL when opening the device under Devices & Services.
		entity_id: 6c3d85e90f9667a01f2d8cbbe2e4fb13 # ID of the occupancy entity on the motion sensor
		domain: binary_sensor
		trigger: device
	conditions: []
	actions:
		- action: notify.mobile_app_tablet # The tablet device name
		data:
			message: "command_screen_on" # The command to trigger screen to turn on
	mode: single
```

What this does: It listens to the Motion sensor, specifically the `occupancy`; whether or not motion is detected.  
When motion detection is true, send a notification to the tablet to turn on the screen with the `command_screen_on` command.

> You can also do this through the HA frontend

## Finished

That's it! Now you have a dashboard which saves energy by only turning on when motion is detected.

![](../../assets/img/blog/using-an-old-tablet-as-a-home-assistant-dashboard/dashboard.webp)

### Side note

Something to keep in mind: I ran into some issues with the screen not turning off which ended up being because I had a camera video live stream on my dashboard. Once I switched `camera_view: live` to `camera_view: auto`, which means the stream only updates every few seconds instead of constantly, the issue was resolved.

Also, in my case I stuck some tape to the underside of my motion sensor, since we have a dog walking around and I didn't want him to trigger the sensor. Now it only sees adult human sized creatures.
