# Actions for Styling Text

## Highlight

The _highlight_ action applies a background color to the selected text.

The configuration specifies the color of the highlight, in one of two forms:

- The **color name**, as defined by Google Docs
- The **hexadecimal (hex)** representation of the color

The name of a color can be found by opening the clicking the highlight menu and hovering over your desired color on the color palette.
In the example below, the configuration "light green 3" would use the hovered color.

<img src="/assets/screenshots/highlight-colors.png" alt="Color palette screenshot" class='small-image' />

Using a hex code offers a lot more flexibility, as you may pick virtually any color. To start, click the
plus icon at the bottom of the highlight color pallete. Once you find a color you like, copy the hex code
of the color (highlighted in the image below) and use this as your configuration.

<img src="/assets/screenshots/highlight-hex.png" alt="Hex colors screenshot" class='small-image' />

## Bold, Underline, and Italicize

These actions do not take any configuration and modify the selected text as you'd imagine.

## Font

The _font_ action changes the font family of the selected text using the font selection menu.
Make sure the font is visible on the font selection menu, either in the short list of recent fonts or in the longer list below it.
Once your font is on the menu, simply use its name as the action's configuration.

<!-- prettier-ignore-start -->
!!! info "Hint"
    The "More fonts" button allows you to change which fonts appear on the menu.
<!-- prettier-ignore-end -->

<img src="/assets/screenshots/font-family.png" alt="Font selection menu screenshot" class='small-image' />

## Font Weight

Some fonts have multiple _weights_, which modify the thickness and darkness of the font.
The _font weight_ action sets the font weight of the selected text. It can change the
font weight to any of the available weights for the current font.

The configuration specifies the name of the font weight.
For example, if you want to use the semi-bold weight for Roboto, then use "Semi Bold" as your configuration.

<img src="/assets/screenshots/font-weight.png" alt="Font weight menu screenshot" class='small-image' />

<!-- prettier-ignore-start -->
!!! note "Note"
    If the current font does not support the specified weight, it will keep the current font weight.
<!-- prettier-ignore-end -->
