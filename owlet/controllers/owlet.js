const { WHAT_IS_OWLET, OWLET_TOKEN } = require("../replays");
const { WHAT_IS_OWLET_BUTTONS, OWLET_TOKEN_BUTTONS } = require("../constants");

const owletCommandHandler = () => {
    return { message: WHAT_IS_OWLET, buttons: WHAT_IS_OWLET_BUTTONS}
}

const owletTokenCommandHandler = () => {
    return { message: OWLET_TOKEN, buttons: OWLET_TOKEN_BUTTONS}
}

module.exports = {
    owletCommandHandler,
    owletTokenCommandHandler
}