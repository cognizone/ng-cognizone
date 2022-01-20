---
id: "Installation"
title: "Installation"
sidebar_label: "Installation"
sidebar_position: 1
custom_edit_url: null
---

Here are the instructions to install this application as a chrome extension -

- Unzip the latest released zip the can be found (for now) in the dedicated Slack channel.
- Go to `chrome://extensions/` on your browser (or equivalent in other chrome-based browsers)
- Enable the developer mode at the top right
- Click on "Load unpacked" button or directly drag&drop the unzipped folder on the page.
- There should be a new extension in your toolbar with the Cognizone logo. This can also be viewed in the extension list. 
- Clicking on it should open a new tab with the Cognizone elastic explorer.

## Enabling protocol-handling

This needs to be done at least on first install, and usually on extension update, since the domain of the extension might change. In this case, there will be a need to reset the "protocol handling" of the extension to be able to click on web+czee links that are used for sharing. Here are the steps:

  - The current entry of the `web+czee` handler must be removed from `chrome://settings/handlers?search=protocol` (this can be ignored for brand new installations).

    [![chromeRemoval](/elastic-explorer/img/webRemoval.png)](/elastic-explorer/img/webRemoval.png)

  - Open a new tab of the extension, and you will be prompted to let the extension handle `web+czee` by clicking on the icon as shown below.
  
    [![allow](/elastic-explorer/img/allow.png)](/elastic-explorer/img/allow.png)
  
