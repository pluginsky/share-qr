import QrCode from 'qrcode';

export const renderQrCode = (canvas: HTMLCanvasElement, text: string) => {
  QrCode.toCanvas(canvas, text, {
    width: 360
  });
};
