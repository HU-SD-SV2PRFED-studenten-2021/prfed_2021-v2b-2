document.addEventListener("DOMContentLoaded", function () {
    const topNavAList = document.getElementById('topnav').childNodes
    const topNav = document.getElementById('topnav')
    topNavAList.forEach(topNavA => {
        const topNavAChildren = topNavA.childNodes
        if (topNavAChildren.length > 0) {
            const actualAItem = topNavAChildren[0]
            actualAItem.addEventListener('click', function (e) {
                topNav.dispatchEvent(new CustomEvent('itemClicked', {detail: actualAItem.id}))
                e.preventDefault()
                topNavAList.forEach(topNavChild => {
                    const topNavActualA = topNavChild.childNodes
                    if (topNavActualA.length > 0) {
                        topNavActualA[0].className = ''
                    }
                })
                actualAItem.className = 'active'
            })
        }
    })
    topNav.addEventListener('itemClicked', function (e) {
        console.log(e.detail)
    })
});