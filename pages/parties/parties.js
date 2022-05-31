import {load_template, render_template} from "/scripts/utilities.js"
import * as party_table_row from "/components/party-tr/party-tr.js";
import * as api from "/scripts/api.js";

const parties_template = await load_template("/pages/parties/parties.html")
const parties_api = new api.parties()

let last_sort_field
let page
let parties

export async function page_handler(match) {
    render_template(parties_template, "main")

    page = match.params?.p ?? 0
    const response = await parties_api.getAll(page)

    parties = response.content

    // remove political bias by presenting a randomized list on first load
    parties.sort((a, b) => Math.random() - 0.5)

    render_table("main > table", parties, party_table_row.render_component, sort_parties_table)
    render_page_links(response)
    router.updatePageLinks()
}


/**
 * @param {string} table_selector
 * @param {[]} data
 * @param {CallableFunction} table_body_row_renderer
 * @param {CallableFunction} table_head_click_handler
 */
function render_table(table_selector, data, table_body_row_renderer, table_head_click_handler) {
    const table = document.querySelector(table_selector)

    const table_head = table.tHead
    table_head.onclick = (event) => table_head_click_handler(event)

    const table_body = table.tBodies.item(0)
    table_body.innerHTML = null
    for (const datum of data) {
        const row = table_body_row_renderer(datum)
        table_body.appendChild(row)
    }
    router.updatePageLinks()
}


/**
 * @param {Event} event
 */
function sort_parties_table(event) {
    event.preventDefault()
    const sort_field = event.target.id

    switch (sort_field) {
        case "parties-table-head-letter": parties.sort((a, b) => a.letter.localeCompare(b.letter,"da")); break;
        case "parties-table-head-name": parties.sort((a, b) => a.name.localeCompare(b.name, "da")); break;
        default: break;
    }

    if (last_sort_field === sort_field) { parties.reverse(); last_sort_field = null }
    else { last_sort_field = sort_field }

    render_table("main > table", parties, party_table_row.render_component, sort_parties_table)
}

function render_page_links(response) {
    const backward = document.querySelector("#parties-page-links-backward")
    const current = document.querySelector("#parties-page-links-current")
    const forward = document.querySelector("#parties-page-links-forward")

    backward.innerHTML = null
    current.innerHTML = null
    forward.innerHTML = null

    if (!response.first) {
        const backward_link = document.createElement("a")
        backward_link.textContent = "Previous Page"
        backward_link.href = `/parties?p=${response.pageable.pageNumber - 1}`
        backward_link.dataset["navigo"] = ""
        backward.appendChild(backward_link)
    }

    const current_text = document.createElement("p")
    current_text.textContent = `You are on page ${response.pageable.pageNumber}`
    current.appendChild(current_text)

    if (!response.last) {
        const forward_link = document.createElement("a")
        forward_link.textContent = "Next Page"
        forward_link.href = `/parties?p=${response.pageable.pageNumber + 1}`
        forward_link.dataset["navigo"] = ""
        forward.appendChild(forward_link)
    }
    router.updatePageLinks()
}
