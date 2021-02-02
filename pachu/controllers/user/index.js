// const apify = require('../../apify')
const request = require("request");
// const superAgent = require('../../superAgent');
const cheerio = require("cheerio");

// const url = 'https://www.lagou.com/zhaopin/webqianduan/?labelWords=label';

class User {
    async index(ctx) {
        let content = ""; // 全部请求内容
        let result = []; // 构建请求的promise
        const total = 10; // 请求页面总数
        // 拉取网页接口
        const getRequest = (num) => {
            return new Promise((resolve, reject) => {
                let getContent = "";
                request.get(
                    "https://movie.douban.com/top250?start=" + num + "&filter=",
                    (err, data, body) => {
                        // 处理拉取到html
                        let $ = cheerio.load(body);
                        $(".grid_view li").each((index, element) => {
                            const title = {
                                电影名称: $(element).find(".title").text(),
                            };
                            getContent += JSON.stringify(title) + "\n";
                        });
                        resolve(getContent);
                    }
                );
            });
        };
        // 构建11个请求
        for (let num = 0; num <= total; num++) {
            result.push(getRequest(num * 25));
        }
        // 拉取到所有页面数据
        const allData = await Promise.all(result);
        // 获取全部内容
        for (let i = 0; i < allData.length; i++) {
            content += allData[i];
        }

        ctx.body = content;
    }
}

module.exports = new User();
