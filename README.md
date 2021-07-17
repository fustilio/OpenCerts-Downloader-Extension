# OpenCerts Downloader Extension

![build](https://github.com/fustilio/OpenCerts-Downloader-Extension/workflows/build/badge.svg) 

[![](https://img.shields.io/chrome-web-store/v/gibpjdabhlfhhgpdkepemfpnndjhhief.svg)](https://chrome.google.com/webstore/detail/opencerts-downloader/gibpjdabhlfhhgpdkepemfpnndjhhief)
[![](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fmjimipdnpjbdgkeeppcaecpljinmilnj)](https://microsoftedge.microsoft.com/addons/detail/opencerts-downloader/mjimipdnpjbdgkeeppcaecpljinmilnj)
<!-- [![](https://img.shields.io/chrome-web-store/rating/gibpjdabhlfhhgpdkepemfpnndjhhief.svg)](https://chrome.google.com/webstore/detail/opencerts-downloader/gibpjdabhlfhhgpdkepemfpnndjhhief)
[![](https://img.shields.io/chrome-web-store/users/gibpjdabhlfhhgpdkepemfpnndjhhief.svg)](https://chrome.google.com/webstore/detail/opencerts-downloader/gibpjdabhlfhhgpdkepemfpnndjhhief) -->
<!-- [![](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fmjimipdnpjbdgkeeppcaecpljinmilnj)](https://microsoftedge.microsoft.com/addons/detail/opencerts-downloader/mjimipdnpjbdgkeeppcaecpljinmilnj)
[![](https://img.shields.io/badge/dynamic/json?label=users&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fmjimipdnpjbdgkeeppcaecpljinmilnj)](https://microsoftedge.microsoft.com/addons/detail/opencerts-downloader/mjimipdnpjbdgkeeppcaecpljinmilnj) -->

## Disclaimer

Use this tool responsibly and at your own discretion; this is not intended for forgery of documents. [Forgery is an offence](https://www.channelnewsasia.com/news/singapore/man-forge-documents-nus-degree-get-jobs-38-companies-11313140).


## Description and Disclaimer
This extension enables you to download a rendered [OpenCerts](https://www.opencerts.io/) certificate, discarding "all the advanced cryptographic protections". 

OpenCerts is great but having a rendered copy of the documents is handy, especially when having to upload to employment portals which have yet to catch up to the OpenCerts standard.

## How to use?
### 1. Download distribution bundle
1. Get the latest [distribution bundle](https://github.com/fustilio/OpenCerts-Downloader-Extension/releases/download/v1.0/release.zip)
2. Unzip it

### 2. Load extension to chrome
1. Enter `chrome://extensions` or `edge://extensions` into your browser's address bar
2. Toggle `Developer mode` to active.
3. Select `Load unpacked`
4. Browse to the folder `dist` from the unzipped bundle earlier.
5. The extension should appear in the list of extensions.

### 3. View your certificate on OpenCerts.io and download
1. Navigate to https://www.opencerts.io/
2. Open certificate using a `.opencert` file
3. Right click on the document and select `Download OpenCerts document(s) > as PDF`
4. The download should begin

## Where can I find my `.opencert` file?
Upon graduation, the `.opencert` file should have been sent to your email, however you can also find it from the MySkill
- [Retrieving .opencert file from MySkillsFuture portal](docs/SKILLSFUTURE.md)

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

## Tested Certificates

| Institution | MM-YYYY |
| :---------: | :-----: |
|     NUS     | 06-2021 |
|     NUS     | 06-2020 |
|     NUS     | 01-2020 |
|     NUS     | 08-2019 |
