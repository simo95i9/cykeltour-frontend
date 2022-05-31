import {load_template, render_template} from "/scripts/utilities.js";
import * as StagesTable from "/components/stages-table/stages-table.js";
import * as api from "/scripts/api.js";

const template = await load_template("/pages/stages/stages.html")

let stages

export async function page_handler(match) {
    render_template(template, "main")
    await fetch_stages_data();
    render_stages_table()
}

async function fetch_stages_data() {
    const data = await api.stages.getAll()
    stages = data.content
}

function render_stages_table() {
    const target = document.querySelector("#stages-table")
    target.innerHTML = null
    target.appendChild(StagesTable.render_component(stages))
    window.router.updatePageLinks();
}