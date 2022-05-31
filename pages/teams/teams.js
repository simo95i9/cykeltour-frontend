import {load_template, render_template} from "/scripts/utilities.js"
import * as TeamsTable from "/components/teams-table/teams-table.js"
import * as api from "/scripts/api.js"

const template = await load_template("/pages/teams/teams.html")

let teams

export async function page_handler(match) {
    render_template(template, "main")

    await fetch_teams_data()

    render_teams_table()
}

async function fetch_teams_data() {
    const data = await api.teams.getAll()
    teams = data.content
}

function render_teams_table() {
    const target = document.querySelector("#teams-table")
    target.innerHTML = null
    target.appendChild(TeamsTable.render_component(teams))
    window.router.updatePageLinks()
}