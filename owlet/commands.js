const { owletCommandHandler, owletTokenCommandHandler } = require("./controllers/owlet");
const { owlersCommandHandler, owlersPrivacyAndPolicyCommandHandler } = require("./controllers/owler");

const COMMANDS = [
    ["/owlet", owletCommandHandler], 
    ["/owlers", owlersCommandHandler],
    ["/owlet_token", owletTokenCommandHandler],
    ["/privacy_and_policy", owlersPrivacyAndPolicyCommandHandler],
];

module.exports = {
    COMMANDS,
}