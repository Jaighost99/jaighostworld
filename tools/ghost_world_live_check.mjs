// Real-browser smoke test for the deployed Jai Ghost World homepage.
// No email is submitted, no purchase or video view is simulated beyond embed creation.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const url = "https://jaighostworld.com/";
const chrome = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const browser = await puppeteer.launch({ executablePath:chrome,headless:true,args:["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"]});
const page = await browser.newPage();
const errors=[];
page.on("pageerror",error=>errors.push(error.message));
await page.setViewport({width:390,height:844,deviceScaleFactor:1});
await page.goto(url,{waitUntil:"domcontentloaded",timeout:60000});
await new Promise(resolve=>setTimeout(resolve,5500));
const report = await page.evaluate(() => {
  const kitSection = document.querySelector("#join-the-world .newsletter-form");
  const kitForm = kitSection?.querySelector("form, iframe, .formkit-form, input[type=email]") || null;
  const assets = [...document.querySelectorAll("img")].filter(el => el.complete).map(el => ({
    path:(el.currentSrc||el.src).split("/").pop(),ok:el.naturalWidth>0
  }));
  return {
    page_title:document.title,
    hero_present:!!document.querySelector(".hero-art"),
    entrance_present:!!document.querySelector("[data-open-ghost-intro]"),
    nightmare_source:document.querySelector("#site-instrumental source")?.getAttribute("src"),
    featured_preview_buttons:document.querySelectorAll(".jgw-feature-play").length,
    featured_videos_not_preloaded:document.querySelectorAll(".premiere-video iframe").length===0,
    join_position:document.querySelector("#join-the-world")?.getBoundingClientRect().top,
    kit_script_present:!!document.querySelector('script[data-uid="49e14c32f9"]'),
    kit_embedded_form_rendered:!!kitForm,
    email_input_present:!!kitSection?.querySelector('input[type="email"]'),
    missing_loaded_images:assets.filter(x=>!x.ok).map(x=>x.path).slice(0,15),
    horizontal_overflow:document.documentElement.scrollWidth>innerWidth+1
  };
});
await page.screenshot({path:"ghost-world-mobile.png",fullPage:true});
await page.click("[data-open-ghost-intro]");
report.entrance_opens=await page.evaluate(()=>document.querySelector("#jgw-intro-modal")?.hidden===false);
await page.click(".jgw-intro-close");
report.entrance_closes=await page.evaluate(()=>document.querySelector("#jgw-intro-modal")?.hidden===true);
await page.click(".jgw-feature-play");
report.video_launch=await page.evaluate(()=>!!document.querySelector(".premiere-video iframe[src*='youtube-nocookie.com/embed/']"));
report.js_errors=errors;
console.log("GHOST_WORLD_BROWSER_REPORT",JSON.stringify(report));
fs.writeFileSync("ghost-world-browser-report.json",JSON.stringify(report,null,2));
await browser.close();
const hardFailures=["hero_present","entrance_present","featured_videos_not_preloaded","entrance_opens","entrance_closes","video_launch","kit_script_present"].filter(key=>report[key]!==true);
if(hardFailures.length) {
  console.error("Critical browser checks failed:",hardFailures.join(", "));
  process.exitCode=1;
}
