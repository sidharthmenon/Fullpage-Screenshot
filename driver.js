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

  async screenshot(filename, size, max){
    if(max){
      await this.driver.manage().window().maximize();
    }
    else{
      await this.driver.manage().window().setRect(size);
    }

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