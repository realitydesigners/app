import { portableTextToHtml } from "astro-sanity";
import { urlForImage } from "./urlForImage";

const customComponents = {
  /* your custom components here */
  types: {
    image: ({ value }) =>
      `<img src="${urlForImage(value).url()}" style="max-width:100%;" />`,
    code: ({ value }) => `<pre><code>${value.code}</code></pre>`,
    h1: ({ value }) =>
      `<h1 style="color: red;">${value.children[0].marks[0].text}</h1>`,
    body: ({ value }) => `<body style="color: red;">${value.text}</h1>`,
  },
};

export function sanityPortableText(portabletext) {
  return portableTextToHtml(portabletext, customComponents);
}

/* may want to use https://github.com/portabletext/react-portabletext*/
