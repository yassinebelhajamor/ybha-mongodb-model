const registry = [

];

register = (name, model) => {
    let shouldPush = true;
    for (let i = 0; i < registry.length; i++) {
        if (registry[i].name === name) {
            shouldPush = false;
            break;
        }
    }
    if (shouldPush) {
        registry.push({
            name,
            model
        });
    } else {
        throw "This Model name is already registered, please choose another name";
    }
}



module.exports.register = register;