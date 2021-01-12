async function getSubCategories(){
    return await fetch("/rest/subcategories", {
        method: 'GET',
    }).then(response => {
        if (response.status !== 200) {
            console.log(response)
            throw response.status
        } else {
            response.json().then(catList => {
                return catList
            })
        }
    })
}

async function getCategories() {
    return await fetch("/rest/categories", {
        method: 'GET',
    }).then(response => {
        if (response.status !== 200) {
            console.log(response)
            throw response.status
        } else {
            response.json().then(catList => {
                return catList
            })
        }
    })
}