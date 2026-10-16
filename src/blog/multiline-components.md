---
title: Dealing with multi-line component designs sucks.
parent: blog
date: 2025-01-16
description: Ever since I started working full time at a company that works according to the common structure of having the design and development departments separate, I’ve ran into a specific code issue multiple times.
---

**EDIT (28-01-2025):**  
A general solution has been found! While it's not quite usable for my specific setup (in which typography settings are set through custom classes), it's still a really clever solution.

<iframe height="300" style="width: 100%;" scrolling="no" title="Icon aligned with first line" src="https://codepen.io/laurens256/embed/jENXyjO?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
  See the Pen <a href="https://codepen.io/laurens256/pen/jENXyjO">
  Icon aligned with first line</a> by Laurens Duin (<a href="https://codepen.io/laurens256">@laurens256</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

This solution has been created by Laurens. Check him out on [LinkedIn](https://www.linkedin.com/in/laurens-duin-497b9a1a9/)!

Now, on to the original blog post:

---

Ever since I started working full time at a company that works according to the common structure of having the design and development departments separate, I’ve run into a specific code issue multiple times.

## The problem

Let me give an example of what we want to achieve:

![](../../assets/img/blog/multiline-components/example-1.webp)  
Above we have a pretty simple component. It has an icon (or image!) on the left with some text next to it.

In the design (made in Figma), the version with one line of text has the items set to vertically align to the center, and the version with multiple lines has it aligned to the top. Along with that, on the multiline, the icon has a top padding of 6px to account for line heights and such.

Seems pretty clear, right?

Well, if you want to create this with some clean and simple HTML and CSS, you’re in trouble. You see, there isn’t really any way to check if text is on a single line or multiple (as far as I’m aware).

Then how about just setting the alignment of both options to either top or centre?

That would look like this:

![](../../assets/img/blog/multiline-components/example-3.webp)![](../../assets/img/blog/multiline-components/example-4.webp)Neither of the two looks very good. And while you could tweak the values to look good for their specific situations, things in the component could change, such as the font size and font family.

## Possible workaround

I asked my nerdy friend if they knew how to fix this without using Javascript, and a possible solution they proposed was to use a pseudo element for the icon/image.

<iframe height="300" style="width: 100%;" scrolling="no" title="Icon with psuedo element demo" src="https://codepen.io/sasjakoning/embed/zxOaLMM?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
  See the Pen <a href="https://codepen.io/sasjakoning/pen/zxOaLMM">
  Icon with psuedo element demo</a> by Sasja (<a href="https://codepen.io/sasjakoning">@sasjakoning</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Which again looks good for specific use cases but sadly isn’t very responsive. Besides, in the projects I work on, we prefer not to use pseudo-elements for images since we have a special component made for it.

## Somewhat a solution

Eventually, after some hours of struggle, I gave up and went for a Javascript solution. I created a utility function that takes the HTML element that contains the text in question, gets the line height and element height, and compares them. If the element height is higher than the line height, the text is multiline.

(Vue.js code)

```
/**
 * Check if text element is multiline.
 * @param {Element} element - The element to check.
 * @return {Boolean} - True if the element is multiline, false otherwise.
 */

export function checkMultiline(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const elementHeight = element.getBoundingClientRect().height;

    return elementHeight > (lineHeight + 1); // Add 1px tolerance for browser   rounding
}

```

I did run into an issue with the browser (and my code) rounding certain values, which I fixed by adding a single pixel to the `lineHeight` value.

Then, in the component that needs the check, I'd have code like this:

```
<template>
    <section 
        class="item"
        :class="{ 'item--multiline': isMultiline }"
    >
        <img 
            class="item-icon" 
            src="https://static-00.iconduck.com/assets.00/tick-circle-icon-512x511-tdqse5ra.png" 
            alt="checkmark icon"
        >
        <p 
            class="item-text"
            ref="textElement"
        >
            (( text ))
        </p>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { checkMultiline } from '../../utils/check-multiline';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    fontFamily: {
        type: String,
        required: true
    }
});

const textElement = ref(null);
const isMultiline = ref(false);

const updateMultiline = () => {
    if (textElement.value) {
        isMultiline.value = checkMultiline(textElement.value);
    }
};

onMounted(() => {
    updateMultiline();
    window.addEventListener('resize', updateMultiline);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateMultiline);
});

</script>
```

I'd put a ref on the element I want to check, wait for the component to be mounted, and run `updateMultiline` which then runs the `checkMultiline` function.

Along with that, I added a listener that re-runs the function when the viewport resizes. This way, when the text of the element wraps to multiple lines, it responds accordingly.

and finally, it turns out like this:

![](../../assets/img/blog/multiline-components/demogif.gif)Which works pretty well! The only thing I noticed is that some fonts still dont look great with this but it'll have to do. (Just don't use Papyrus, sheesh)

While I’m not entirely content with this solution, it does work. But secretly I’m still on the hunt for a clean CSS (or SCSS) based solution.

Perhaps you know something? Don’t be afraid to shoot me a message.
