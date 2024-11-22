const { default: axios } = require('axios');
const Cheerio  = require('cheerio')

    let count = 0;
async function scrapeWebsite () {
    try {
        const response = await axios.get('https://en.wikipedia.org/wiki/Web_scraping');

        const $ = Cheerio.load(response.data);

        //get the page title 
        const title = $('title').text();
        console.log('title ', title);

        //get all the paragraphs containing specific word
        const paragraph = $('p:contains("World Wide Web")').map((i, el) => $(el).text()).get();
        count = $('p:contains("World Wide Web")').map((i, el) => count += 1);
        console.log('paragraph: ', paragraph);
        console.log('word count : ', count.length);

        // list all the titles from the page
        const paraTitle = [];
        const titleList = $('h2');
        for (i = 0; i < titleList.length; i++){
            paraTitle[i] = $(titleList[i]).text();
        }
        console.log('paragraph titles: ', paraTitle);
       
    }catch (error) {
        console.log('error:', error);
    }
}

scrapeWebsite();