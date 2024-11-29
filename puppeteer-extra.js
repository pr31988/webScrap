
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-extra';   // to create a headless browser request 
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const url = 'https://www.amazon.in/s?k=amazon+macbook+pro&crid=209UJSC4ETXAW&sprefix=amazon+macbook+%2Caps%2C248&ref=nb_sb_ss_ts-doa-p_5_15'
async function webScrape() {
    try{
        
        puppeteer.use(StealthPlugin())

        puppeteer.launch({headless: true}).then(async browser => {
            console.log('Running tests..')
            const page = await browser.newPage()
            await page.goto(url)
            await new Promise(r => setTimeout(r, 3000));
            await page.screenshot({ path: 'testresult.png', fullPage: true });
            await browser.close()
            console.log(`All done, check the screenshot. ✨`)
        })  
     
    }catch (error){
        console.log('error:', error)
    }

}

webScrape();
