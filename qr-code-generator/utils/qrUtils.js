//QR code generation helpers
const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  return await QRCode.toDataURL(data);
};

module.exports = { generateQRCode };
