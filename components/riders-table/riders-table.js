import {load_template} from "/scripts/utilities.js";

const template = await load_template("/components/riders-table/riders-table.html")

export function render_component(riders) {
    const table = template.content.cloneNode(true)

    const table_body = table.querySelector("tbody")

    for (const rider of riders) {
        render_rider_tr(rider, table_body)
    }

    return table;
}

function render_rider_tr(rider, table_body) {
    const row = table_body.insertRow()

    const name_cell = row.insertCell()
    name_cell.textContent = rider.name

    const team_cell = row.insertCell()
    team_cell.textContent = rider.teamName

    const country_cell = row.insertCell()
    country_cell.textContent = rider.flag

    const age_cell = row.insertCell()
    age_cell.textContent = rider.birth

    const link_cell = row.insertCell()
    const link = link_cell.appendChild(document.createElement("a"))
    link.textContent = "See more"
    link.href = `/riders/${rider.id}`
    link.dataset["navigo"] = ""

    return row;
}