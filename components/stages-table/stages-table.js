import {load_template} from "/scripts/utilities.js";

const template = await load_template("/components/stages-table/stages-table.html")

export function render_component(stages) {
    const table = template.content.cloneNode(true)

    const table_body = table.querySelector("tbody")

    for (const stage of stages) {
        render_stage_tr(stage, table_body)
    }

    return table;
}

function render_stage_tr(stage, table_body) {
    const row = table_body.insertRow()

    const name_cell = row.insertCell()
    name_cell.textContent = stage.name

    const description_cell = row.insertCell()
    description_cell.textContent = stage.description

    const link_cell = row.insertCell()
    const link = link_cell.appendChild(document.createElement("a"))
    link.textContent = "See more"
    link.href = `/stages/${stage.id}`
    link.dataset["navigo"] = ""

    return row;
}