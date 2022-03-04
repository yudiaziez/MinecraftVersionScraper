const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
    let versions = await getVersionsAndGetterUrl();

    // await getterLinkToDowmnloadUrl('https://getbukkit.org/get/68aef01121494a41fe71890b81d69d07');
    await Promise.all(
        versions = Object.entries(versions).map(async ([k, v]) => {
            const downloadUrl = await getterLinkToDowmnloadUrl(v.getUrl);
            return { ...v, downloadUrl }
        }));

    console.log(versions);

})();

async function getterLinkToDowmnloadUrl(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const downloadUrl = $($('#get-download > div > div > div:nth-child(2) > div > h2 a'))[0].attribs.href;
    return downloadUrl;
}

async function getVersionsAndGetterUrl() {
    const versions = [];
    const response = await axios.get(`https://getbukkit.org/download/spigot`);
    const html = response.data;
    const $ = cheerio.load(html);
    $('.download-pane').each((i, item) => {
        const $pane = cheerio.load($(item).html());
        // console.log($pane.html());
        const version = $pane('.row .col-sm-3 h2').text().trim();
        const getUrl = $pane('.row .col-sm-4 .btn-group .btn-download')[0].attribs.href;
        versions.push({ version, getUrl })
    })
    return versions;
}

