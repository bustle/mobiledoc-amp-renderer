## Mobiledoc AMP HTML Renderer [![Build Status](https://travis-ci.org/bustlelabs/mobiledoc-amp-html-renderer.svg?branch=master)](https://travis-ci.org/bustlelabs/mobiledoc-amp-html-renderer)

This is an Google AMP renderer for the [Mobiledoc format](https://github.com/bustlelabs/mobiledoc-kit/blob/master/MOBILEDOC.md) used
by [Mobiledoc-Kit](https://github.com/bustlelabs/mobiledoc-kit).

Learn about [Google AMP here on GitHub](https://github.com/ampproject/amphtml).

To learn more about Mobiledoc cards and renderers, see the **[Mobiledoc Cards docs](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md)**.

The renderer is a small library intended for use in servers that are building
AMP documents.

### Usage

```
var mobiledoc = {
  version: "0.2.0",
  sections: [
    [         // markers
      ['B']
    ],
    [         // sections
      [1, 'P', [ // array of markups
        // markup
        [
          [0],          // open markers (by index)
          0,            // close count
          'hello world'
        ]
      ]
    ]
  ]
};
var renderer = new AMPHTMLRenderer({cards: []});
var rendered = renderer.render(mobiledoc);
console.log(rendererd.result); // "<p><b>hello world</b></p>"
```

The Renderer constructor accepts a single object with the following optional properties:
  * `cards` [array] - The list of card objects that the renderer may encounter in the mobiledoc
  * `atoms` [array] - The list of atom objects that the renderer may encounter in the mobiledoc
  * `cardOptions` [object] - Options to pass to cards and atoms when they are rendered
  * `unknownCardHandler` [function] - Will be called when any unknown card is enountered
  * `unknownAtomHandler` [function] - Will be called when any unknown atom is enountered
  * `sectionElementRenderer` [object] - A map of hooks for section element rendering.
    * Valid keys are P, H1, H2, H3, BLOCKQUOTE, PULL-QUOTE
    * A valid value is a function that returns an element

The return value from `renderer.render(mobiledoc)` is an object with two properties:
  * `result` [string] - The rendered result
  * `teardown` [function] - When called, this function will tear down the rendered mobiledoc and call any teardown handlers that were registered by cards when they were rendered

#### sectionElementRenderer

Use this renderer option to customize what element is used when rendering
a section.

```
var renderer = new MobiledocAMPHTMLRenderer({
  sectionElementRenderer: {
    P: function() { return document.createElement('span'); },
    H1: function() { return document.createElement('h2'); },
    H2: function() {
      var element = document.createElement('h2');
      element.setAttribute('class', 'subheadline');
      return element;
    }
    /* Valid keys are P, H1, H2, H3, BLOCKQUOTE, PULL-QUOTE */
  }
});
var rendered = renderer.render(mobiledoc);
```

### Tests

Command-line:

 * `npm test`

Or in the browser:

 * `broccoli serve`
 * visit http://localhost:4200/tests

### Releasing

* `npm version patch` or `minor` or `major`
* `npm run build`
* `git push bustle --tags`
* `npm publish`
