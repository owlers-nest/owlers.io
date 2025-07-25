const MAIN_BOT_LIST = [
    [
        {
            text: "What's owlet?",
            callback_data: "WHAT_IS_OWLET",
        },
    ],
    [
        {
            text: "What's owlers?",
            callback_data: "WHAT_IS_OWLERS",
        },
    ],
    // [
    //     {
    //         text: "$Owl token",
    //         callback_data: "OWLER_TOKEN",
    //     }
    // ],
];

const WHAT_IS_OWLET_BUTTONS = [
    [
        {
            text: "How it is working?",
            callback_data: "HOW_OWLET_IS_WORKING",
        },
        {
            text: "What are the main features?",
            callback_data: "WHAT_ARE_OWLET_MAIN_FEATURE",
        },
    ],
    // [
    //     {
    //         text: "« Back owlet list",
    //         callback_data: "BACK_TO_MAIN_LIST",
    //     },
    // ]
]

const WHAT_IS_OWLERS_BUTTONS = [
    [
        {
            text: "Owler platform",
            callback_data: "SHOW_OWLERS_PLATFORM",
        },
        {
            text: "Owlers social media links",
            callback_data: "SHOW_OWLERS_SOCIAL_LINKS",
        },
    ],
    // [
    //     {
    //         text: "« Back owlet list",
    //         callback_data: "BACK_TO_MAIN_LIST",
    //     },
    // ]
]


const OWLET_TOKEN_BUTTONS = [
    [
        {
            text: "token address",
            callback_data: "SHOW_OWLET_TOKEN_ADDRESS",
        },
        {
            text: "token on BSC scan",
            callback_data: "SHOW_OWLERS_SOCIAL_LINKS",
        },
    ]
]


const OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT = {
    SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO: "SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO",
    SHOW_OWLERS_PRIVACY_AND_POLICY_INFO: "SHOW_OWLERS_PRIVACY_AND_POLICY_INFO",
    SHOW_OWLERS_PRIVACY_AND_POLICY_USE_OF_WALLET: "SHOW_OWLERS_PRIVACY_AND_POLICY_USE_OF_WALLET",
    SHOW_OWLERS_PRIVACY_AND_POLICY_DATA: "SHOW_OWLERS_PRIVACY_AND_POLICY_DATA",
    SHOW_OWLERS_PRIVACY_AND_POLICY_GOVERNANCE: "SHOW_OWLERS_PRIVACY_AND_POLICY_GOVERNANCE",
    SHOW_OWLERS_PRIVACY_AND_POLICY_THIRD_PARTY: "SHOW_OWLERS_PRIVACY_AND_POLICY_THIRD_PARTY",
    SHOW_OWLERS_PRIVACY_AND_POLICY_COOKIES: "SHOW_OWLERS_PRIVACY_AND_POLICY_COOKIES",
    SHOW_OWLERS_PRIVACY_AND_POLICY_RIGHTS_AND_CONTROL: "SHOW_OWLERS_PRIVACY_AND_POLICY_RIGHTS_AND_CONTROL",
    SHOW_OWLERS_PRIVACY_AND_POLICY_CHANGES: "SHOW_OWLERS_PRIVACY_AND_POLICY_CHANGES",
    SHOW_OWLERS_PRIVACY_AND_POLICY_CONTACT_US: "SHOW_OWLERS_PRIVACY_AND_POLICY_CONTACT_US"
}

const OWLERS_PRIVACY_AND_POLICY_BUTTONS = [
    [
        {
            text: "Introduction",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INTRO,
        }
    ],
    [
        {
            text: "Information we don't collect",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_INFO,
        },
            {
            text: "Use of wallet",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_USE_OF_WALLET,
        }
    ],
    [
        {
            text: "Data and security",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_DATA,
        }
    ],
    [
        {
            text: "Cookies and tracking technologies",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_COOKIES,
        },
    ],
    [
        {
            text: "Community governance",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_GOVERNANCE,
        },
        {
            text: "Third-Party services",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_THIRD_PARTY,
        }
    ],
    [
        {
            text: "Your rights and control",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_RIGHTS_AND_CONTROL,
        }
    ],
    [
        {
            text: "Changes to this policy",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_CHANGES,
        },
        {
            text: "Contact us",
            callback_data: OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT.SHOW_OWLERS_PRIVACY_AND_POLICY_CONTACT_US,
        }
    ]
]

const BOT_USERNAME = "@iowlet_ai_bot"

module.exports = {
    MAIN_BOT_LIST,
    WHAT_IS_OWLET_BUTTONS,
    WHAT_IS_OWLERS_BUTTONS,
    BOT_USERNAME,
    OWLET_TOKEN_BUTTONS,
    OWLERS_PRIVACY_AND_POLICY_BUTTONS,
    OWLERS_PRIVACY_AND_POLICY_BUTTONS_TEXT
}