require("dotenv").config();

const TelegramBot = require('node-telegram-bot-api');
const { listProjects } = require("./api/projects");
const { MAIN_BOT_LIST, WHAT_IS_OWLET_BUTTONS, WHAT_IS_OWLERS_BUTTONS, OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT, OWLERS_PRIVACY_AND_POLICY_BUTTONS } = require("./constants");
const { HOW_OWLET_IS_WORKING, WHAT_ARE_OWLET_MAIN_FEATURE, WHAT_IS_OWLET, WHAT_IS_OWLERS, SHOW_OWLERS_PLATFORM, SHOW_OWLERS_SOCIAL_LINKS, OWLERS_PRIVACY_AND_POLICY } = require("./replays");
const { isBotMentioned } = require("./utils/chat");

const { COMMANDS } = require("./commands");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_APP_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const currentInquiries = {};
const OWLERS_GROUP_CHAT_ID = "-1002476310449"
const botId = "@iowlet_ai_bot"

// Listen for any kind of message. There are different kinds of
// messages.
const getMarkupButtons = (buttons) => {
  return {
    reply_markup: {
      inline_keyboard: buttons
    }
  }
}

bot.onText('/start', (msg) => {

  const hello = `
Welcome to Owlet 🦉✨

Owlet is your trusted AI assistant, empowering investors in ICOs & IPOs. Whether you're new to the world of crypto investments or an experienced investor, Owlet is here to help you discover, evaluate, and verify the legitimacy of projects before you commit.

🔍 How Owlet Helps You:

Spot Scams: Owlet has a keen eye for identifying risky projects and scams, ensuring you're always in the know.
Invest Smartly: Whether you're exploring new investment opportunities or adding your own project, Owlet has got you covered!
Just type any of the commands below, and I'll be happy to assist you. 👇

Owlet Commands:

🦉 Owlet
/owlet – Learn more about Owlet and how it helps investors like you.

🌍 Owlers Community
/owlers – Discover the Owlers community and join like-minded investors.

💎 Owlet Token
/owlet_token – Learn more about Owlet's community token and its benefits.

📜 Privacy & Policy
/privacy_and_policy – Read about our platform policy and privacy practices.

Need More Help?

👤 Private Chat with Owlet
Start a private chat with me @iowlet_ai_bot — I'll assist you directly!

🌐 Join the Community
Visit our platform: Owlers.io — Your go-to place for trustworthy investment opportunities.

Feel free to reach out anytime, and I'll help you navigate the world of ICOs & IPOs safely! 💼🔐
  `
  
  bot.sendMessage(msg.chat.id, hello, {
    parse_mode: "HTML"
  })
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name} ${msg.from.last_name} How can i help you?`, getMarkupButtons(MAIN_BOT_LIST))
});

// bot.onText("/owlet", (msg) => {
//   bot.sendMessage(msg.chat.id, "you need to learn more about owlet");
// });


COMMANDS.forEach((COMMAND) => {
  const [commandTxt, commandFn] = COMMAND;
  bot.onText(commandTxt, (msg) => {
    const { message, buttons } = commandFn();
    console.log({ message, buttons });
    bot.sendMessage(msg.chat.id, message,
      {
        ...getMarkupButtons(buttons),
        parse_mode: "HTML"
      }
    );
  })
});


const OWLET_INTRO_MESSAGE = `
  Hello this is Owlet, the baby owl. owlet is your AI assistant dedicated to empowering investors in ICOs & IPOs. Owlet helps small and medium investors discover, evaluate, and verify project legitimacy before committing. Owlet's keen eye for spotting scams ensures you're always in the know. Owlet has you covered whether you're looking to add your project or seeking trustworthy investment opportunities! 🦉✨
  <strong>How can I help you</strong>
`

bot.on("message", (msg) => {
  console.log("========= received new message");
  const { entities, text } = msg;
  if (entities && text && isBotMentioned(entities, text)) {
    const { type, id } = msg.chat;
    const { first_name, last_name, username } = msg.from;
    console.log(first_name, last_name, username)
    if (type === "group" || type === "supergroup") {
      const tokens = msg.text.split(" ");
      if (tokens.includes(botId)) {
        bot.send
        bot.sendMessage(id, `Hello ${first_name} ${last_name} How can i help you?`,
          {
            reply_to_message_id: msg.id,
            ...getMarkupButtons(MAIN_BOT_LIST),
            parse_mode: "HTML"
          }
        );
      }
    }
  }
})

bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
  console.log("====== callbackQuery: ", callbackQuery);
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };

  currentInquiries[msg.chat.id] = action;
  switch (action) {
    case "WHAT_IS_OWLET": {
      bot.editMessageText(WHAT_IS_OWLET, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLET_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }
    case "HOW_OWLET_IS_WORKING": {
      bot.editMessageText(HOW_OWLET_IS_WORKING, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLET_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }
    case "WHAT_ARE_OWLET_MAIN_FEATURE": {
      bot.editMessageText(WHAT_ARE_OWLET_MAIN_FEATURE, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLET_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }


    case "WHAT_IS_OWLERS": {
      bot.editMessageText(WHAT_IS_OWLERS, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLERS_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }
    case "WHAT_IS_OWLERS": {
      bot.editMessageText(WHAT_IS_OWLERS, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLERS_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }
    case "SHOW_OWLERS_PLATFORM": {
      bot.editMessageText(SHOW_OWLERS_PLATFORM, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLERS_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }
    case "SHOW_OWLERS_SOCIAL_LINKS": {
      bot.editMessageText(SHOW_OWLERS_SOCIAL_LINKS, {
        ...opts,
        ...getMarkupButtons(WHAT_IS_OWLERS_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }

    case OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO: {
      bot.editMessageText(OWLERS_PRIVACY_AND_POLICY[OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO], {
        ...opts,
        ...getMarkupButtons(OWLERS_PRIVACY_AND_POLICY_BUTTONS),
        parse_mode: "HTML"
      });
      break;
    }

    case "BACK_TO_MAIN_LIST": {
      bot.editMessageText(`Hello ${msg.from.first_name} ${msg.from.last_name} How can i help you?`, {
        ...opts,
        ...getMarkupButtons(MAIN_BOT_LIST),
        parse_mode: "HTML"
      });
      break;
    }
  }
});