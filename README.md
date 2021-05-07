# Electron, TypeScript, Material-UI, React Boilerplate

Modern and lightweight boilerplate built with electron, typescript, react, webpack, and material-ui. This also demonstrates live-reloading and static images.

## Major technologies

- [React.js 17](https://reactjs.org/)
- [Electron 12](https://www.electronjs.org/)
- [Material-UI 5](https://next.material-ui.com/)
- [Webpack 5](https://webpack.js.org/)
- Typescript, ESLint, and Prettier are used to improve the developer experience

## Getting Started

1. Download this repo or run the following command to clone it

```sh
git clone https://github.com/Hidenaga41/GUIAppForOperators.git
```

2. Using NPM 7, run the following command to install dependencies

```sh
npm install
```

3. Run the following command to build and start the development version of your app with live reloading.

```sh
npm run dev
```

## Packaging

Run `npm run package` to build and package your electron app.

## Common issues

### xcrun: error: invalid active developer path

This is caused when elecron-builder tries to sign a build. Run `xcode-select --install` to install the necessary Xcode tools.

## Folder structure

```
myapp/
| - dist/               //- Generated by Webpack automatically
| - node_modules/
| - packages/           //- Generated by build script automatically
| - static/             //- Global static assets
| | - electron.svg
| - src/
| | - main/             //- Backend modules for the Electron app
| | | - main.ts         //- Entry point of 'electron-main'
| | - renderer/         //- Frontend React components for the Electron app
| | | - index.tsx       //- Entry point of 'electron-renderer'
| - webpack/            //- Webpack config files
| | - electron.webpack.ts
| | - react.webpack.ts
| - .eslintrc           //- ESLint config
| - .gitignore
| - package-lock.json
| - package.json
| - tsconfig.json       //- TypeScript config
| - webpack.config.js   //- Webpack config
```

## Contributing

Pull requests are always welcome 😃.

## License

This project is licensed under the terms of the [MIT license](LICENSE).
