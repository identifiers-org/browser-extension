# Browser extension for identifiers.org

This browser extension aims at facilitating workflows that use identifiers.org URIs. Both Firefox and Google Chrome are supported.

> [!IMPORTANT]
> This extension is currently a work in progress.

## Features

Two main feature groups are available: the embedded search bars and the action menu actions.

### Embedded search bars

The current search bars are available from the extension menu at the [identifiers.org homepage](http://identifiers.org) for easy access. These work in the same was as in the homepage.

![](./screenshots/popup.png)

### Context menu actions

These are available by right-clicking selected text, links and web pages. 

![](./screenshots/context-menu.png)

The three actions available are:

#### Resolve selected CURIE
By selecting a CURIE string on any page, users can go to the URL resolved by our resolution services.

#### Get identifiers.org URI for selected URL
By right-clicking a link or selecting a URL as text, an identifiers.org URI can be generated for it if it is in our registry.

#### Get identifiers.org URI for this page
By right-clicking any page, an identifiers.org URI can be generated for it if it is in our registry.


## Compilation
To generate zipped files for Firefox and Chrome, use the npm script `build:all`. Alternatively, `build:firefox` and `build:chrome` are available to build only a specific zip file.
```sh
npm install
npm run build:all
```

## Instalation
While this is a work in progress, please use Firefox's or Chrome's extension debugging features. The zip files will be available after running the compilation steps above.
- [Load extension-firefox.zip as a temporary add-on on Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
- [Unpack extension-chrome.zip and load it on Google Chrome](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode)

## Troubleshooting
- Please make sure notifications are enabled on your browser and OS; otherwise, the extension will be completely silent, and you might mistake it for not working.
