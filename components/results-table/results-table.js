import {load_template} from "/scripts/utilities.js";

const template = await load_template("/components/results-table/results-table.html")

export function render_component(results) {
    const table = template.content.cloneNode(true)

    const table_body = table.querySelector("tbody")

    for (const result of results) {
        render_result_tr(result, table_body)
    }

    return table;
}

function render_result_tr(result, table_body) {
    const row = table_body.insertRow()

    const team_cell = row.insertCell()
    team_cell.textContent = result.rider.teamName

    const rider_cell = row.insertCell()
    rider_cell.textContent = result.rider.name

    const country_cell = row.insertCell()
    country_cell.textContent = result.rider.flag

    const mountain_points_cell = row.insertCell()
    mountain_points_cell.textContent = result.mountainPoints

    const flat_points_cell = row.insertCell()
    flat_points_cell.textContent = result.flatPoints

    const time_cell = row.insertCell()
    time_cell.textContent = result.time

    return row;
}