# Full page Screenshot for webpages

## usage
1. clone this repo
```
git clone https://github.com/sidharthmenon/Fullpage-Screenshot.git
```

2. change directory
```
cd Fullpage-Screenshot
```
3. install dependancy
```
npm install
```

4. get screenshot
```
node index.js -u https://www.apple.com/ca/macbook/ -o E:/apple-screenshot.png -m
```
> in this screenshot the images will be out of position as it is not loaded properly so we have to add wait time
5. screenshot with wait time
```
node index.js -u https://www.apple.com/ca/macbook/ -o E:/apple-screenshot.png -m -s 2000
```
6. screenshot with specific window width
```
node index.js -u https://www.apple.com/ca/macbook/ -o E:/apple-screenshot.png -s 2000 -w 600 -h 500
```

## flag explanations
|Flag|Usage|type|
|---|---|---|
|-u| url| string
|-o| output file path|string
|-w| width|number
|-h| height|number
|-m| maximize|boolean
|-s| wait time|number
