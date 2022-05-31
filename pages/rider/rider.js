import {load_template, render_template} from "/scripts/utilities.js";
import * as ResultsTable from "/components/results-table/results-table.js";
import * as api from "/scripts/api.js";

const template = await load_template("/pages/rider/rider.html")

let rider
let results

export async function page_handler(match) {
    render_template(template, "main")

    await fetch_rider_data(match)
    await fetch_results_data(match)

    render_heading(rider)
    render_results_table(results)
}

function render_heading(rider) {
    const heading_name = document.querySelector("#rider-heading-name")
    heading_name.textContent = rider.name
}

function render_results_table(results) {
    const target = document.querySelector("#rider-results-table")
    target.innerHTML = null
    target.appendChild(ResultsTable.render_component(results))
}

async function fetch_rider_data(match) {
    const data = await api.riders.getById(match.data.id)
    rider = data
}

async function fetch_results_data(match) {
    const data = await api.results.getByRiderId(match.data.id)
    results = data.content
}