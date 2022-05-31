import {load_template} from "../../scripts/utilities.js";

const notification_template = await load_template("/components/notification/notification.html")

export class notification_sender {
    #target

    constructor(target_selector) {
        this.#target = document.querySelector(target_selector)
    }

    log(message) {
        send_notification("log", message, this.#target)
    }

    info(message) {
        send_notification("info", message, this.#target)
    }

    warn(message) {
        send_notification("warn", message, this.#target)
    }

    error(message) {
        send_notification("error", message, this.#target)
    }

    debug(message) {
        send_notification("debug", message, this.#target)
    }
}

/**
 * @param {string} type
 * @param {string} message
 * @param {HTMLElement} target
 */
function send_notification(type, message, target) {
    const notification = notification_template.content.cloneNode(true)

    const notification_icon = notification.querySelector("[data-icon]")
    const notification_message = notification.querySelector("[data-message]")
    const notification_close = notification.querySelector("[data-close]")

    notification_message.textContent = message
    notification_close.onclick = (event) => close_notification(event)

    switch (type) {
        case "log":
            notification_icon.textContent = "💬"
            notification.firstChild.classList.add("log")
            break
        case "info":
            notification_icon.textContent = "📝"
            notification.firstChild.classList.add("info")
            break
        case "warn":
            notification_icon.textContent = "⚠️"
            notification.firstChild.classList.add("warn")
            break
        case "error":
            notification_icon.textContent = "⛔️"
            notification.firstChild.classList.add("error")
            break
        case "debug":
            notification_icon.textContent = "🐞"
            notification.firstChild.classList.add("debug")
            break
        default:
            break
    }
    target.appendChild(notification)
}

function close_notification(event) {
    event.target.parentElement.remove();
}