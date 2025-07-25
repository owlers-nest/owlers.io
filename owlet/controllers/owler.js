const { WHAT_IS_OWLERS, OWLERS_PRIVACY_AND_POLICY } = require("../replays");
const { WHAT_IS_OWLERS_BUTTONS, OWLERS_PRIVACY_AND_POLICY_BUTTONS } = require("../constants");

const owlersCommandHandler = () => {
    return { message: WHAT_IS_OWLERS, buttons: WHAT_IS_OWLERS_BUTTONS}
}

const owlersPrivacyAndPolicyCommandHandler = () => {
    return { message: OWLERS_PRIVACY_AND_POLICY, buttons: OWLERS_PRIVACY_AND_POLICY_BUTTONS}
}

module.exports = {
    owlersCommandHandler,
    owlersPrivacyAndPolicyCommandHandler
}