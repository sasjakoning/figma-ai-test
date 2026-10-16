---
title: Building a Chrome extension for my website
parent: blog
date: 2025-07-21
description: I built a Chrome extension in which I use the Storyblok Management API to add the link of the current active tab to my links page on my website.
---

*(Header image from *[*Qubika*](https://qubika.com/blog/chrome-extensions-unlocking-power-browser/)*)*

On my website I have a [page](https://sasjakoning.com/links) in which I list a bunch of links that I find interesting and/or useful. However, I rarely add new links to the list due to the effort required to do so.

When I find something interesting, I'd first have to log in to Storybook, navigate to my pages, open the links page, navigate a bunch of breadcrumbs until I can add a link. And then I'll have to manually add the link, a title and description.

As a very ~~lazy~~ efficient person that's simply too many steps for something so simple.

I learned that besides the Storyblok Content Delivery API, which only fetches data, there's also a Management API in which I can add data.

So I thought, why not make a Chrome Extension that does this for me?

## Building a Chrome extension

As it turns out, building an extension is surprisingly easy. Let me take you along:

I followed [this documentation](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) from the Chrome developer site.

First I have a `manifest.json` file in which I define the title, description etc. of the extension.

```
{
  "name": "Add link to blog",
  "description": "Add a link to your links list on sasjakoning.com",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_popup": "index.html",
    "default_icon": "hello_extensions.png"
  },
  "permissions": [
    "tabs"
  ]
}
```

The `"permissions": ["tabs"]` section is needed in my case since I want to get the url of the currently active browser tab.

Then there's a `index.html` file where I set up basic elements, which I then style with a `style.css` file (Which I won't paste here since it's purely aesthetic):

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Hello Extensions</title>
  </head>
  <body>
    <h1 class="title">Add link to blog</h1>

    <div class="login">
      <label class="login__label" for="apiKeyInput">Enter your API key</label>
      <input
        class="login__input"
        type="text"
        id="apiKeyInput"
        placeholder="Enter your API key"
      />
      <button class="login__button" id="loginButton">Login</button>
    </div>

    <div class="description loggedin hidden">
      <label class="description__label" for="descriptionInput"
        >Add a description (optional)</label
      >
      <textarea
        class="description__input"
        rows="4"
        id="descriptionInput"
        placeholder="Enter link description"
      ></textarea>
      <button class="save-button" id="saveLinkButton">Save link to blog</button>
    </div>

    <div class="status-message" id="statusMessage"></div>
    <script src="script.js"></script>
  </body>
</html>

```

In here I have two main elements. A login screen and a logged in screen. I didn't want to store the API key needed for the Management API statically in the code, so I made an input for it.

The logic for all this is handled in the `script.js` file:

```
let hasEnteredKey = false;
let apiKey = localStorage.getItem("apiKey");

const loginScreen = document.querySelector(".login");
const apiKeyInput = document.querySelector(".login__input");
const loginButton = document.querySelector(".login__button");

const loggedInScreen = document.querySelector(".loggedin");
const descriptionInput = document.querySelector(".description__input");
const saveLinkButton = document.querySelector(".save-button");

// A status message element to provide feedback to the user
const statusMessage = document.querySelector(".status-message");

if (statusMessage) {
    statusMessage.textContent = "Ready to save link";
}

// If API key is found in localStorage, update the UI accordingly
if (apiKey) {
    hasEnteredKey = true;
    loginScreen.classList.add("hidden");
    loggedInScreen.classList.remove("hidden");
} else {
    console.log("No API key found in localStorage.");
}

// Event listener for the login button, which checks if the user has entered an API key. No validation is performed here since it's a personal extension.
loginButton.addEventListener("click", () => {
    if (apiKeyInput.value.trim() === "") {
        console.log("User has not entered a key yet.");
        statusMessage.textContent = "Please enter your API key to log in.";
        return;
    } else {
        console.log("User has entered a key.");
        statusMessage.textContent = "API key entered successfully.";
        localStorage.setItem("apiKey", apiKeyInput.value.trim());
        apiKey = apiKeyInput.value.trim();
        hasEnteredKey = true;
        loginButton.disabled = true; // Disable the button after login

        // Hide the login screen and show the logged-in screen
        loginScreen.classList.add("hidden");
        loggedInScreen.classList.remove("hidden");
        statusMessage.textContent = "Logged in successfully!";
    }
});

// Event listener for the save link button, which retrieves the current tab's URL and title, and sends them to the Storyblok API.
saveLinkButton.addEventListener("click", async () => {
    statusMessage.textContent = "Saving link...";
    saveLinkButton.disabled = true;
    // This uses the chrome.tabs API to get the active tab's URL and title. That's why we set the permissions in the manifest.json file.
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const url = tab.url;
    const title = tab.title;
    const description = descriptionInput ? descriptionInput.value : '';

    console.log(`Saving link: ${title} - ${url}`);

    await sendLinkToStoryblok(url, title, description);
});

// Function to send the link to Storyblok API
async function sendLinkToStoryblok(url, title, description) {

    try {
        // Links to a specific Storyblok story in my space
        const story = await fetch('https://mapi.storyblok.com/v1/spaces/123/stories/123', {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
        });

        const storyData = await story.json();

        console.log("Fetched story data:", storyData);

        // Prepare the new link object to be added to the story
        const newLink = {
            link: {
                id: '',
                url: url,
                target: '_blank',
                fieldType: 'multilink',
                linkType: 'url',
                cached_url: url,
            },
            tags: '',
            title: title,
            component: 'list-link-item',
            description: description,
        };

        const body = storyData.story.content.body;
        // Add the new link to the beginning of the links array
        body[1].links.unshift(newLink);

        // Prepare the payload to update the story
        const payload = {
            story: {
                name: storyData.story.name,
                slug: storyData.story.slug,
                id: storyData.story.id,
                content: storyData.story.content,
            },
            force_update: 1,
        };

        // Send the updated story to the Storyblok API and publish it
        const updated = await fetch('https://mapi.storyblok.com/v1/spaces/123/stories/123', {
            method: 'PUT',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const publish = await fetch('https://mapi.storyblok.com/v1/spaces/123/stories/123/publish', {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json',
            },
        });

        // Check if the update was successful, otherwise handle the error
        if (updated.ok) {
            statusMessage.textContent = "Link saved successfully!";
            saveLinkButton.disabled = false;
            console.log("Link saved successfully:", newLink);
        } else {
            statusMessage.textContent = "Failed to save link";
            saveLinkButton.disabled = false;
            console.error("Failed to save link:", updated.statusText);
        }
    } catch (error) {
        statusMessage.textContent = "Error saving link";
        console.error("Error saving link:", error);
    }
}
```

In short, it gets the API key and performs a fetch, then  adds a new link object to the response and sends it back to Storybook. After that it also makes sure the story is published directly, otherwise it would stay as a draft in Storybook and not update on the live page.

Now all that's left is to add the extension to the browser. You can do so by navigating to [chrome://extensions/](chrome://extensions/) and turning on developer mode in the top right corner. Then you click "load unpacked" and select the folder with your code. The extension should show up and work.

## The result

This is what it looks like with my code:

![](../../assets/img/blog/building-a-chrome-extension-for-my-website/login.webp)

And with the API key entered:

![](../../assets/img/blog/building-a-chrome-extension-for-my-website/screen.webp)

And by clicking "Save link to blog", the link is added to my link list!

The code I wrote for this is admittedly a little messy, but does the job for something I alone will use. Perhaps I'll rework it in the future but for now I'm just happy to have a quicker way to add new links to my site :D
