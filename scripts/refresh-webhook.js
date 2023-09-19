/* jshint node: true, esversion:11, asi:true */
"use strict"
require('dotenv').config();
const fetch = require("node-fetch")
const main = async () => {
    const res1 = await fetch(`https://api.airtable.com/v0/bases/${process.env.AIRTABLE_BASE}/webhooks`, {
        headers: {
            Authorization: `Bearer ${process.env.WEBHOOK_REFRESH_KEY}`
        }
    })
    const webhooksRes = await res1.json()
    const webhooks = webhooksRes.webhooks
    const enabledWebhooks = webhooks.filter(webhook => webhook.isHookEnabled)
    if (enabledWebhooks.length > 0) {
        console.log(`There is already ${enabledWebhooks.length} enabled webhook. Let's refresh it`)
        const id = enabledWebhooks[0].id
        const res2 = await fetch(`https://api.airtable.com/v0/bases/${process.env.AIRTABLE_BASE}/webhooks/${id}/refresh`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WEBHOOK_REFRESH_KEY}`
            }
        })
        const webhooksRes2 = await res2.json()
        console.dir(webhooksRes2)
        return
    }
    const specification = {
        "options": {
            "filters": {
                "dataTypes": [
                    "tableData"
                ],
                "recordChangeScope": process.env.AIRTABLE_TABLE
            }
        }
    }
    console.log("Creating a new webhook")
    const notificationUrl = process.env.WEBHOOK_NOTIFICATION_URL
    const res3 = await fetch(`https://api.airtable.com/v0/bases/${process.env.AIRTABLE_BASE}/webhooks`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WEBHOOK_REFRESH_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            notificationUrl,
            specification
        })
    })
    const webhooksRes3 = await res3.json()
    console.dir(webhooksRes3)


}
main()