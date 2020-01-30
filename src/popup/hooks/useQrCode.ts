import QrCode from 'qrcode';

export const useQrCode = () => {
  const renderQrCode = (canvas: HTMLCanvasElement, text: string) => {
    QrCode.toCanvas(canvas, text, {
      width: 360
    });
  };

  return { renderQrCode };
};
