import QrCode from 'qrcode';

const canvas = document.createElement('canvas');

QrCode.toCanvas(canvas, '');
