import "/scripts/navigo@8.11.1/lib/navigo.js"

import * as Home from "/pages/home/home.js"

import * as Stages from "/pages/stages/stages.js"
import * as Stage from "/pages/stage/stage.js"

import * as Teams from "/pages/teams/teams.js"
import * as AddTeam from "/pages/add-team/add-team.js"

import * as Riders from "/pages/riders/riders.js"
import * as Rider from "/pages/rider/rider.js"

const route_handlers = {
    "/": Home.page_handler,
    "/stages": Stages.page_handler,
    "/stages/:id": Stage.page_handler,

    "/teams": Teams.page_handler,
    //"/teams/:id": Team.page_handler,
    "/teams/add": AddTeam.page_handler,
    // "/teams/delete": DeleteTeam.page_handler,

    "/riders": Riders.page_handler,
    "/riders/:id": Rider.page_handler,
    // "/riders/add": AddRider.page_handler,
    // "/riders/delete": DeleteRider.page_handler,

}

window.router = new Navigo("/", {hash: true,});

for (const route in route_handlers) {
    router.on(route, async (match) => {
        route_handlers[route](match)
    })
}

router.resolve()
