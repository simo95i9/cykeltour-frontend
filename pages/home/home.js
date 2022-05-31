import {load_template, render_template} from "/scripts/utilities.js";
import {notification_sender} from "/components/notification/notification.js";

const home_template = await load_template("/pages/home/home.html")
const notifications = new notification_sender("header > #notifications")

let data

export async function page_handler(match) {
    console.log("In 'home' handler")
    render_template(home_template, "main")
    attach_event_listeners()
}

function attach_event_listeners() {
    document.querySelector("#home-log-button").onclick = () => {
        const message = document.querySelector("#home-message-input").value
        notifications.log(message)
    }

    document.querySelector("#home-info-button").onclick = () => {
        const message = document.querySelector("#home-message-input").value
        notifications.info(message)
    }

    document.querySelector("#home-warn-button").onclick = () => {
        const message = document.querySelector("#home-message-input").value
        notifications.warn(message)
    }

    document.querySelector("#home-error-button").onclick = () => {
        const message = document.querySelector("#home-message-input").value
        notifications.error(message)
    }

    document.querySelector("#home-debug-button").onclick = () => {
        const message = document.querySelector("#home-message-input").value
        notifications.debug(message)
    }
}