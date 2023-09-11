"use strict"
/* jshint node: true, esversion:11, asi:true */
const Image = require("@11ty/eleventy-img");
module.exports = function (eleventyConfig) {
    //copy anything in src/static into the root
    eleventyConfig.addPassthroughCopy({
        "src/static": "/"
    });
    eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
        let metadata = await Image(src, {
            outputDir: "./_site/airtableimages",
            urlPath: "/airtableimages/"
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        // You bet we throw an error on a missing alt (alt="" works okay)
        return Image.generateHTML(metadata, imageAttributes);
    });
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };

};