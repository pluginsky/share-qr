# ShareQR

<img src="" />

## About

Share selected text or page URL as QR code.

##### Main Features

- display QR code for URL
- display QR code for selected text or copy/paste/cut text from clipboard

## Setup

##### 1. Clone repo

```sh
git clone https://github.com/JB1905/share-qr.git
```

##### 2. Go to directory

```sh
cd share-qr
```

##### 3. Install dependencies

```sh
yarn

# Or, use npm
npm i
```

##### 4. Run

```sh
yarn watch

# Or, use npm
npm run watch
```

### Chrome

- open the Extension Management page by navigating to `chrome://extensions`
- enable Developer Mode by clicking the toggle switch next to Developer mode
- click the `LOAD UNPACKED` button and select the **dist** in the extension directory

### Firefox

- enter `about:debugging` in the URL bar
- click `This Firefox`
- click `Load Temporary Add-on`
- open the **dist** in the extension’s directory and select any file inside

## Build with

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
