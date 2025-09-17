# Cross-Browser extension for identifiers.org

This browser extension aims at facilitating workflows that use identifiers.org URIs. Both Firefox and Google Chrome are supported.

> [!IMPORTANT]
> These widgets are currently a work in progress.

### Features
It embeds the current search bars available at the [identifiers.org homepage](http://identifiers.org) for easy access.
![](./screenshots/popup.png)

It also contains context menu actions for quickly generating identifiers.org URIs and resolving CURIEs.
![](./screenshots/context-menu.png)

### Compilation
To generate zipped files with the extension files for the two browsers use `npm run build:all`. Make sure you run `npm install` first.

### Instalation
While this is work in progress, please use Firefox's or Chrome's extension debugging features.
- [Load extension-firefox.zip as a temporary add-on on Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
- [Unpack extension-chrome.zip and install them Google Chrome extension developer mode](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode)
