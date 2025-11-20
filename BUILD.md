# Build Instructions

(Created for submission to the Firefox Add-on Store)

### Requirements

- Node Package Manager (npm) version >=10.9.0

(The default reviewer build environment should work)

## Steps

To compile the source code, follow these steps:

- `npm install --legacy-peer-deps`
- `npm run build`
- `cp build/manifest.firefox.json build/manifest.json`

The compiled extension code will be in the `build` directory.

Alternatively, you may run `bash build.sh`, which will run these steps for you.
