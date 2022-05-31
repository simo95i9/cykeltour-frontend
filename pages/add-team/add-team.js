import {load_template, render_template} from "/scripts/utilities.js";
import * as api from "/scripts/api.js"

const template = await load_template("/pages/add-team/add-team.html")

export function page_handler(match) {
    render_template(template, "main")

    attach_event_listeners()
}

function attach_event_listeners() {
    const button = document.querySelector("#add-team-button")
    button.onclick = submit_form
}

async function submit_form() {
    const team_request = {}

    team_request.name = document.querySelector("#add-team-form #name").value

    await api.teams.create(team_request)

    window.router.navigate("/teams")
}