require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
var fs = require("fs");
var path = require("path");

class Driver {
  constructor(incognito=false, headless=false){
    this.options = new chrome.Options();
    if(incognito==true){
      this.options.addArguments("--incognito")
    }
		else{
      this.options.addArguments("user-data-dir=selenium-whatsapp")
    }
		if(headless==true){
			this.options.addArguments("--disable-gpu")
			this.options.addArguments("--headless")
			this.options.addArguments("--no-sandbox")
			this.options.addArguments("--window-size=1400x800")
      this.options.addArguments('--log-level=3')
    }

    this.driver = new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
        
  }

  async screenshot(filename, size, max, wait){
    if(max){
      await this.driver.manage().window().maximize();
    }
    else{
      await this.driver.manage().window().setRect(size);
    }


    var scrollScript = `function range(start, end, inc) {
        if(start >= end) return [start];
        return [start, ...range(start + inc, end, inc)];
      }
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function start_scroll(){ 
        for await (var i of range(100, document.body.scrollHeight, 500)){
          window.scrollTo(0,i); 
          await sleep(${wait});
        }
        return true;
      }
      start_scroll();
      `;

    await this.driver.executeScript(scrollScript);

    await this.driver.wait(function(){
      return this.driver.executeScript("return ((window.pageYOffset + window.innerHeight) >= document.body.scrollHeight)")
    }.bind(this));

    await this.driver.executeScript("window.scrollTo(0,0)");
    await this.driver.sleep(1000);      

    var file = path.join(__dirname, "./html2canvas.min.js")
    var script = fs.readFileSync(file,'utf8')
    await this.driver.executeScript(script);

    var screenScript = `function genScreenshot () {
                          var canvasImgContentDecoded;
                          html2canvas(document.body, {
                            onrendered: function (canvas) {                                          
                                window.canvasImgContentDecoded = canvas.toDataURL("image/png");
                          }});
                        }
                        genScreenshot();`;
    
    await this.driver.executeScript(screenScript);
    await this.driver.sleep(1000);      
    
    var png = await this.driver.executeScript("return canvasImgContentDecoded;");
    png = png.replace("data:image/png;base64,", "");
    
    fs.writeFile(filename, png, 'base64', function(err) {
      if(err) console.log(err);
    });
  }

  get(url){
    return this.driver.get(url);
  }
}

module.exports = Driver;


