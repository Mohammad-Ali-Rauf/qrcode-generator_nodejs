import express from 'express';
import qr_code from 'qrcode';
import qr_code_terminal from 'qrcode-terminal';
import inquirer from 'inquirer';
import path from 'path';

const generateQRCode = async () => {
  const { url } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL:',
      validate: (input) =>
        input.startsWith('http://') ||
        input.startsWith('https://') ||
        "Invalid URL. Please enter a valid URL starting with 'http://' or 'https://'.",
    },
  ]);

  try {
    await qr_code.toFile('qrcode.png', url)
    const directoryPath = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(directoryPath, 'qrcode.png');
    qr_code_terminal.generate(url, { small: true, scale: 0.5  }, function (qrcodeString) {
        console.log(`QR Code generated successfully:\n\n${qrcodeString}`);
    });
    console.log(`QR code generated successfully and saved in your computer as qrcode.png on ${filePath}.`);
  } catch (err) {
    console.error('An error occurred while generating the QR code.', err);
  }
};

generateQRCode();
