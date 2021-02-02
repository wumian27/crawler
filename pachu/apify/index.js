
const Apify = require('apify');
const {
    utils: { enqueueLinks },
} = Apify;
/**
 * 解析网页，获取电影信息
 */
function parseMovie($) {
    const movieDoms = $('.grid_view .item');
    const movies = [];
    movieDoms.each((index, item) => {
        const movie = {
            rank: $(item).find('.pic em').text(), // 排名
            name: $(item).find('.title').text(), // 电影名
            score: $(item).find('.rating_num').text(), // 评分
            sketch: $(item).find('.inq').text() // 主题
        }
        movies.push(movie)
    })
    return movies
}

module.exports = () => {
    let allResult = [];
    return new Promise((resolve, reject) => {
        Apify.main(async () => {
            // 创建请求队列
            const requestQueue = await Apify.openRequestQueue();
            // 将要爬取的url添加到队列当中
            await requestQueue.addRequest({ url: 'https://movie.douban.com/top250' });
            
            const handlePageFunction = async ({ request, $ }) => {
                // 解析页面获取电影信息
                const movies = parseMovie($);
                allResult.push(...movies)
                // movies.forEach((item, i) => {
                //     console.log(`${item.rank}|${item.name}|${item.score}|${item.sketch}`)
                // })
                console.log(request.loadedUrl);
                //抓取url
                await enqueueLinks({
                    $,
                    requestQueue, 
                    selector: '.next a', // 跳转的a标签
                    baseUrl: request.loadedUrl, //根据baseUrl会将a中的href补全
                });
            }
        
            //创建一个CheerioCrawler,将requestQueue，handlePageFunction作为参数传入
            const crawler = new Apify.CheerioCrawler({
                // maxRequestsPerCrawl: 20, // <------ This is new too.
                requestQueue,
                handlePageFunction
            })
            // 启动爬虫
            await crawler.run();
            // console.log(6666)
            resolve(1233)
        })
    })
  
}


