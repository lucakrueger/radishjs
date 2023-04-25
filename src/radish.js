import './dynamic.js'
import './bind.js'
import './click.js'

window.bindings = new Proxy(window, {
    get: (target, key, value) => {
        return target[key]
    },
    set: (target, key, value) => {
        console.log(`${key} set to ${value}`)
        target[key] = value
        return true
    }
})