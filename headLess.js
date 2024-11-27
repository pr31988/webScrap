
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';   // to create a headless browser request 

const url = 'https://www.amazon.in/s?k=amazon+macbook+pro&crid=209UJSC4ETXAW&sprefix=amazon+macbook+%2Caps%2C248&ref=nb_sb_ss_ts-doa-p_5_15'
async function webScrape() {
    try{
        
        const browser = await puppeteer.launch({headless: 'new'});
        const page = await browser.newPage();

        await page.goto(url);
        
        const htm = await page.content();
        await browser.close();

        const $ = cheerio.load(htm);
        const products = [];

        $('.s-widget-container').each((i,ele) => {
            const title = $(ele).find('.s-title-instructions-style').text();
            const priceElement = $(ele).find('.a-price > span').first();

            const price = parseInt(priceElement.text());

            if (!title || isNaN(price))
                return
            products.push({
                title,
                price
            })
        });
      
        console.log(products);

     
    }catch (error){
        console.log('error:', error)
    }

}

webScrape();