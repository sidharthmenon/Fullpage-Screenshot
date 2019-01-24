var Driver = require('./driver')
var argv = require('minimist')(process.argv.slice(2));

// Full Page Screenshot
// -u <url>
// -o <output file path>
// -w <width>
// -h <height>
// -m maximize


var browser = new Driver();
if(argv.u){
  browser.get(argv.u)
}
else{
  console.log('-u parameter is required');
}


if(argv.o){
  browser.screenshot(argv.o, {width: argv.w, height: argv.h, x:50, y:50}, argv.m);
}
else{
  console.log('-o parameter is required');
}
