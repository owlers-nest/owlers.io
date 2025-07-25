const { BOT_USERNAME } = require("../constants");

const isBotMentioned = (entities, chatText) => {
    const mentions = entities.filter(entity => entity.type === "mention");

    const isMentioned = mentions.find(mention => {
        const { offset, length } = mention;
        const subStr = chatText.substr(offset, length);
        return subStr === BOT_USERNAME
    });

    return Boolean(isMentioned);
}

module.exports = {
    isBotMentioned,
}