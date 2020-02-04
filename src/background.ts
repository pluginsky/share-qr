import extension from 'extensionizer';

extension.runtime.onStartup.addListener(function() {
  extension.storage.local.clear();
});

extension.contextMenus.create({
  title: 'Share as QR code',
  id: 'share-as-qr-code',
  contexts: ['selection']
});

extension.contextMenus.onClicked.addListener((info: any) => {
  if (info.menuItemId === 'share-as-qr-code') {
    extension.storage.local.set({
      selectedText: info.selectionText,
      currentTab: 'text'
    });

    console.log(extension.browserAction.openPopup);

    extension.browserAction.openPopup();
  }
});
