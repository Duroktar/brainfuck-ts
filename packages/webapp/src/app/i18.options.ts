import i18n from "i18next";

export const i18Options: i18n.InitOptions = {
    resources: {
        en: {
            translation: {
                "brainfuck": "Brainfuck",
                "examplesTitle": "Click one of the buttons to load up the example source",
                "lastUpdated": "Last Evaluated @",
                "fileDrop": "Drop your own brainfuck files here to load them",
                "result": "Evaluate code and see the output here",
                "evaluate": "Evaluate",
                "reference": "(reference)",
                "locale": "Language:",
                "createdBy": "Created by ",
                "legend": "Legend",
                "incrementTape": "Increment the data pointer (to point to the next cell to the right",
                "decrementTape": "Decrement the data pointer (to point to the next cell to the left)",
                "incrementByte": "Increment (increase by one) the byte at the data pointer",
                "decrementByte": "Decrement (decrease by one) the byte at the data pointer",
                "output": "Accept a byte of input, store its value in byte at the data pointer",
                "input": "Output the value of the byte at the data pointer",
                "openLoop": "If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command",
                "closeLoop": "If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command",
                "Special Commands": "Special Commands",
                "Shortcut": "Shortcut added for debugging purposes. Writes to the dev console.",
                "Options": "Placed on the first line of a file to specify options for the compiler.",
                "ShortcutText": `With 'option' being either "literal" or "fromCharCode".`,
                "OptionsText": "Set the max number of cycles allowed in the main interpreter loop.",
                "ShortcutTip": "'fromCharCode' runs the value through 'String.fromCharCode(value)', which is useful for printing out more than just numbers from your program.",
                "OptionsTip": "Check out the fibonacci example to see this in use. (Try setting it down to 60000 in that example).",
                "LanguageTip": "Help add more languages to the site; see <here:TODO> for more info!",
                "default": "default",
            }
        }
    },
    fallbackLng: "en",

    interpolation: {
        escapeValue: false
    }
}
