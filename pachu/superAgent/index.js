const fs = require("fs");
const path = require("path");
const superAgent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");
const mkdirs = require("../mkdir");
const { resolve } = require("path");

module.exports = () => {

    return new Promise((resolve, reject) => {
        let content = "";
        let imgs = [];
        superAgent.get("https://www.sina.com.cn/?form=sougo").end((err, res) => {
            console.log(err);
            if (err) {
                console.log(err);
                return;
            }
            let $ = cheerio.load(res.text);
            $(".uni-blk-pic").each((index, element) => {
                let temp = {
                    标题: $(element).find("span").text(),
                };
                content += JSON.stringify(temp) + "\n";
                // console.log(content);
                if ($(element).find("img").length > 0) {
                    imgs.push($(element).find("img").attr("src"));
                    let img = $(element).find("img").attr("src");
                    img = img.includes("http") ? img : "http:" + img;
                    const ext = path.extname(img);
        
                    // request(img).pipe(
                    //     fs.createWriteStream("./pachu/image/img" + index + ext)
                    // );
                }
            });
        
            // console.log(imgs);
        
            function saveContent() {
                fs.writeFile("pachu/content/content.txt", content.toString(), (err) => {
                    console.log(err);
                });
            }
            // mkdirs("./pachu/content", saveContent);

            resolve(content)
        });
    })
  
}
