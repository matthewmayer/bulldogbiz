module.exports = function (eleventyConfig) {
    //copy anything in src/static into the root
    eleventyConfig.addPassthroughCopy({
        "src/static": "/"
    });
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};