import {load_template} from "/scripts/utilities.js";

const template = await load_template("/components/teams-table/teams-table.html")

export function render_component(teams) {
    const table = template.content.cloneNode(true)

    const table_body = table.querySelector("tbody")

    for (const team of teams) {
        render_team_tr(team, table_body)
    }

    return table;
}

function render_team_tr(team, table_body) {
    const row = table_body.insertRow()

    const name_cell = row.insertCell()
    name_cell.textContent = team.name

    const count_cell = row.insertCell()
    count_cell.textContent = team.riders.length

    const link_cell = row.insertCell()
    const link = link_cell.appendChild(document.createElement("a"))
    link.textContent = "See more"
    link.href = `/teams/${team.id}`
    link.dataset["navigo"] = ""

    return row;
}