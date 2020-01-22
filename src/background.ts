import extension from 'extensionizer';

extension.contextMenus.create({
  title: 'Share as QR code',
  id: 'share-as-qr-code',
  contexts: ['selection']
});

extension.contextMenus.onClicked.addListener((info: any, tab: any) => {
  if (info.menuItemId === 'share-as-qr-code') {
    console.log(info.selectionText);

    extension.browserAction.openPopup();
  }
});
