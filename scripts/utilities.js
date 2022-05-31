/**
 * @param {RequestInfo} url
 * @return {HTMLTemplateElement}
 */
export async function load_template(url) {
    console.log("In 'load_template()' with url='"+url+"'")
    const response = await fetch(url)
    if (!response.ok)
        throw new Error(`Could not fetch template '${response.url}', with HTTP status ${response.statusText}`)

    const text = await response.text()

    const fragment = document.createElement("template")
    fragment.innerHTML = text

    return fragment
}

/**
 * @param {HTMLTemplateElement} template
 * @param {string} target_selector
 * @return {void}
 */
export function render_template(template, target_selector) {
    console.log("In 'render_template()'")
    const content = template.content.cloneNode(true)
    const target = document.querySelector(target_selector)

    target.innerHTML = null
    target.appendChild(content)

    window.router.updatePageLinks()
}