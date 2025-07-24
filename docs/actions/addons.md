# Executing Add-ons

The _execute add-on_ action runs a Google Docs add-on from the Extensions menu.
The action's configuration should specify how to reach the add-on from this menu.

For example, if you have the "Debate Format" add-on with a "Shrink" tool, then your
configuration should be "Debate Format.Shrink".

<img src="/assets/screenshots/addon-menu.png" alt="Add-on menu screenshot" class='large-image' />

## Sample Add-on

Creating a custom add-on is a great way to extend Docs Hotkey's functionality.
Below is the source code for an add-on that shrinks any unbolded and unhighlighted text.
Some users have had success using LLMs (specifically Gemini) to create custom add-on scripts — have the model
use the _onOpen_ function below to create an add-on menu that is compatible with Docs Hotkey.

```javascript
function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Shrink', 'shrink').addToUi()
}

function shrink() {
  const doc = DocumentApp.getActiveDocument()
  if (!doc.getSelection()) {
    return
  }
  const elements = doc.getSelection().getRangeElements()
  for (let element of elements) {
    if (!element.getElement().asText) {
      continue
    }
    const text = element.getElement().asText()
    const indices = text.getTextAttributeIndices()
    indices.push(text.getText().length)
    for (let i = 0; i < indices.length - 1; i++) {
      if (!text.isBold(indices[i]) && !text.getBackgroundColor(indices[i])) {
        text.setFontSize(indices[i], indices[i + 1] - 1, 8)
      }
    }
  }
}
```
