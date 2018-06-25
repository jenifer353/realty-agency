const generate = (c) =>
    exports[c] = c

const generatePromise = (c) => {
    generate(`${c}_PENDING`)
    generate(`${c}_FULFILLED`)
    generate(`${c}_REJECTED`)
    generate(c)
}

const generateModel = (c) => {
    generatePromise(`LOAD_${c}`)
    generatePromise(`SAVE_${c}`)
    generatePromise(`REMOVE_${c}`)
}

generate('SET_AUTH_TOKEN')
generate('UNSET_AUTH_TOKEN')
generateModel('ACCOUNTS')
generatePromise('LOAD_SERVICES')
generatePromise('SAVE_ACCOUNT')
generatePromise('LOAD_CURRENT')
generatePromise('LOAD_REVIEWS_ABOUT')
