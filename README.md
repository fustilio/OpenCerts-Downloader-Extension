# OpenCerts Downloader Extension

![build](https://github.com/fustilio/OpenCerts-Downloader-Extension/workflows/build/badge.svg)

## Description
This extension enables you to download a rendered [OpenCerts](https://www.opencerts.io/) certificate, discarding "all the advanced cryptographic protections".

OpenCerts is great but having a rendered copy of the documents is handy, especially when having to upload to employment portals which have yet to catch up to the OpenCerts standard.

## How to use?
### 1. Download distribution bundle
1. Get the latest [distribution bundle](https://github.com/fustilio/OpenCerts-Downloader-Extension/releases/download/v1.0/dist.zip)
2. Unzip it

### 2. Load extension to chrome
1. Enter `chrome://extensions` or `edge://extensions` into your browser's address bar
2. Toggle `Developer mode` to active.
3. Select `Load unpacked`
4. Browse to the folder `dist` from the unzipped bundle earlier.
5. The extension should appear in the list of extensions.

### 3. View your certificate on OpenCerts.io and download
1. Navigate to https://www.opencerts.io/
2. Open certificate using `.opencert` file
3. Right click on the document and select `Download OpenCerts document(s) > as PDF`
4. The download should begin

## Motivation
OpenCerts is an "an easy way to check and verify your certificates" but exporting the certificate is challenging.

From the OpenCerts FAQ:  [Why can't I print the certificate?](https://www.opencerts.io/faq)

> Printing the certificate discards all the advanced cryptographic protections we have built into OpenCerts, hence printed certificates are not to be considered authentic.

## Development Setup

### Install Dependencies
```
yarn install
```
### Build Project

```
yarn build
```
Or start build task with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>
