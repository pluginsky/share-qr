import extension from 'extensionizer';

extension.runtime.onStartup.addListener(function() {
  extension.storage.local.clear();
});

extension.contextMenus.create({
  title: 'Share as QR code',
  id: 'share-as-qr-code',
  contexts: ['selection']
});

extension.contextMenus.onClicked.addListener((info: any, tab: any) => {
  let sharedText: string;

  if (info.menuItemId === 'share-as-qr-code') {
    if (info.selectionText > 60) {
      sharedText = info.selectionText.substring(0, 60);
    } else {
      sharedText = info.selectionText;
    }

    extension.storage.local.set({ sharedText });

    extension.browserAction.openPopup();
  }
});
