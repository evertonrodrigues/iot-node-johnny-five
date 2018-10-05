const fs = require('fs');
require('dotenv').config()
const configFilePath = './device/src/wifiConfig.h';
let wifiConfigFile = fs.readFileSync(configFilePath, 'utf8');

const config = new Map([
    ['ssid_pattern',`char ssid[] = "${process.env.DEVICE_WIFI_SSID}"; //\${ssid_pattern}`],
    ['wpa_passphrase_pattern', `char wpa_passphrase[] = "${process.env.DEVICE_WIFI_PASSWORD}"; //\${wpa_passphrase_pattern}`],
    ['server_port_pattern', `#define SERVER_PORT ${process.env.DEVICE_SERVER_PORT || 3030} //\${server_port_pattern}`]
]) 

let isConfigDefined = process.env.DEVICE_STATIC_IP_ADDRESS ? true : false;
config.set('static_ip_address_pattern',`${isConfigDefined? '': '//'}#define STATIC_IP_ADDRESS ${process.env.DEVICE_STATIC_IP_ADDRESS} //\${static_ip_address_pattern}`);

isConfigDefined = process.env.DEVICE_SUBNET_MASK ? true : false;
config.set('subnet_mask_pattern', `${isConfigDefined ? '' : '//'}#define SUBNET_MASK ${process.env.DEVICE_SUBNET_MASK} // REQUIRED for ESP8266_WIFI, optional for others \${subnet_mask_pattern}`);

isConfigDefined = process.env.DEVICE_GATEWAY_IP_ADDRESS ?  true: false;
config.set('gateway_ip_address_pattern' , `${isConfigDefined ? '' : '//'}#define GATEWAY_IP_ADDRESS ${process.env.DEVICE_GATEWAY_IP_ADDRESS} // REQUIRED for ESP8266_WIFI, optional for others \${gateway_ip_address_pattern}`);

const replacePattern = (configLine, strPattern) => {
    console.log(`Replacing property with pattern: ${strPattern}`);
    console.log(`New config line : ${configLine}`);
    const pattern = new RegExp("^.*\\$\\{"+ strPattern+"\\}.*$",'gm');
    const res = wifiConfigFile.match(pattern);
    wifiConfigFile = wifiConfigFile.replace(res[0],configLine);    
}

config.forEach(replacePattern);

fs.writeFileSync(configFilePath,wifiConfigFile);
console.log('Setup for wifiConfig.h finish.');