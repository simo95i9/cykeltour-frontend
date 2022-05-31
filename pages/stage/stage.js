import {load_template, render_template} from "/scripts/utilities.js";
import * as ResultsTable from "/components/results-table/results-table.js";
import * as api from "/scripts/api.js";

const template = await load_template("/pages/stage/stage.html")

let stage
let results

export async function page_handler(match) {
    render_template(template, "main")

    await fetch_stage_data(match)
    await fetch_results_data(match)

    render_heading(stage)
    render_results_table(results)
}

function render_heading(stage) {
    const heading_name = document.querySelector("#stage-heading-name")
    heading_name.textContent = stage.name
}

function render_results_table(results) {
    const target = document.querySelector("#stage-results-table")
    target.innerHTML = null
    target.appendChild(ResultsTable.render_component(results))
}

async function fetch_stage_data(match) {
    const data = await api.stages.getById(match.data.id)
    stage = data
}

async function fetch_results_data(match) {
    const data = await api.results.getByStageId(match.data.id)
    results = data.content
}