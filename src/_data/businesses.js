"use strict"
/* jshint node: true, esversion:11, asi:true */
require('dotenv').config();
const Airtable = require('airtable');
Airtable.configure({
    apiKey: process.env.AIRTABLE_KEY
})
let base = new Airtable().base(process.env.AIRTABLE_BASE);
const camelCase = input => {
    const regex = /\s+(\w)?/gi;
    const output = input.toLowerCase().replace(regex, function (match, letter) {
        return letter.toUpperCase();
    });
    return output
}

module.exports = function () {
    return new Promise((resolve, reject) => {
        let allRecords = []
        base(process.env.AIRTABLE_TABLE).select({
            maxRecords: 1000,
            filterByFormula: "{Published} = TRUE()",
        }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    const newRecord = {}
                    Object.keys(record.fields).forEach(key => {
                        newRecord[camelCase(key)] = record.fields[key]
                    })
                    newRecord.createdTime = record._rawJson.createdTime
                    allRecords.push(newRecord);

                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                const categories = [...new Set(allRecords.map(record => record.category))].sort()
                allRecords.sort((a, b) => {
                    if (a.createdTime < b.createdTime) {
                        return 1
                    }
                    if (a.createdTime > b.createdTime) {
                        return -1
                    }
                    return 0
                })
                return resolve({
                    list: allRecords,
                    categories
                })
            });
    });
}