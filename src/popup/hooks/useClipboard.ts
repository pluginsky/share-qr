interface Params {
  // TODO support event param
  onPaste: (e: Event) => void;
  onCopy: (e: Event) => void;
  onCut: (e: Event) => void;
}

export const useClipboard = ({ onPaste, onCopy, onCut }: Params) => {
  window.addEventListener('paste', onPaste);
  window.addEventListener('copy', onCopy);
  window.addEventListener('cut', onCut);

  return () => {
    window.removeEventListener('paste', onPaste);
    window.removeEventListener('copy', onCopy);
    window.removeEventListener('cut', onCut);
  };
};
