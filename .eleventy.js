module.exports = function (eleventyConfig) {
    //copy anything in src/static into the root
    eleventyConfig.addPassthroughCopy({
        "src/static": "/"
    });
};