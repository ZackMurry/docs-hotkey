function onOpen() {
  DocumentApp.getUi().createMenu('Debate Format').addItem('Shrink', 'shrink').addToUi()
}

function shrink() {
  const doc = DocumentApp.getActiveDocument()
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
