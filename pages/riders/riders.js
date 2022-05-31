import {load_template, render_template} from "/scripts/utilities.js"
import * as RidersTable from "/components/riders-table/riders-table.js"
import * as api from "/scripts/api.js"

const template = await load_template("/pages/riders/riders.html")

let riders

export async function page_handler(match) {
    render_template(template, "main")

    await fetch_riders_data()

    render_riders_table()
}

async function fetch_riders_data() {
    const data = await api.riders.getAll()
    riders = data.content
}

function render_riders_table() {
    const target = document.querySelector("#riders-table")
    target.innerHTML = null
    target.appendChild(RidersTable.render_component(riders))
    window.router.updatePageLinks()
}