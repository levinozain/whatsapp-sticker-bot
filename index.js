const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
 
const client = new Client();
 
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    });
 
client.on('ready', () => {
    console.log('Client is ready!');
});
 
const prefix = "!";
 
client.on('message', async msg => {
 
    if (msg.body[0] == prefix){
        
        var [cmd, ...args] = msg.body.slice(1).split(" ");
        args = args.join(" ");
 
        if (cmd == "say"){
            client.sendMessage(msg.from, args);
        }
        
        if (cmd === "s") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendMediaAsSticker: true});
        }
 
        if (cmd === "s2") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendVideoAsGif: true});
        }
    }
        
});
 
client.initialize();
