const axios = require('axios');
const cheerio = require('cheerio');
const versions = {};
(async () => {
    const response = await axios.get(`https://getbukkit.org/download/spigot`);
    const html = response.data;
    const $ = cheerio.load(html);
    $('.download-pane').each((i, item) => {
        const $pane = cheerio.load($(item).html());
        // console.log($pane.html());
        const version = $pane('.row .col-sm-3 h2').text().trim();
        const getUrl = $pane('.row .col-sm-4 .btn-group .btn-download')[0].attribs.href;
        versions[version] = { version, getUrl };
    })

    console.log(versions);
})();

