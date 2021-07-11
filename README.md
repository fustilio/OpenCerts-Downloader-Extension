# OpenCerts Downloader Extension

![build](https://github.com/fustilio/OpenCerts-Downloader-Extension/workflows/build/badge.svg)

## Description
This extension enables you to download a rendered [OpenCerts](https://www.opencerts.io/) certificate, discarding "all the advanced cryptographic protections".

OpenCerts is great but having a rendered copy of the documents is handy, especially when having to upload to employment portals which have yet to catch up to the OpenCerts standard.


## Motivation
OpenCerts is an "an easy way to check and verify your certificates" but exporting the certificate is challenging.

From the OpenCerts FAQ:  [Why can't I print the certificate?](https://www.opencerts.io/faq)

> Printing the certificate discards all the advanced cryptographic protections we have built into OpenCerts, hence printed certificates are not to be considered authentic.


## Setup

### Install Dependencies
```
yarn install
```
### Build Project

```
yarn build
```
Or start build task with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>

## Load extension to chrome

Load `dist` directory

Open `chrome://extensions`
Select `Developer mode`
`Load unpacked`
