document.querySelectorAll('[rjs-click]').forEach((value) => {
    value.addEventListener('click', (event) => {
        window[value.getAttribute('rjs-click')](event)
    })
})