if(typeof JQuery === undefined)
{
    throw Error("JQuery wasn't loaded correctly!");
}

/****************************************
                utils.js
****************************************/

const VERSION = "0.0.1";

function setColorScheme(scheme)
{
    let schemeLib = {
        ['Plain']: {
            pbg: '#777',
            xt: '#ff0565',
            fg: '#fff',
            bg: '#555',
        },
        ['Ascocia']: {
            pbg: '#777',
            xt:  '#ff4a72',
            fg:  '#ff98ae',
            bg:  '#ffccd7',
        },
        ['Ternure']: {
            pbg: '#333',
            xt:  '#B51628',
            fg:  '#ffaaaa',
            bg:  '#aa7777',
        },
        ['Contrast']: {
            pbg: '#333',      //promptBg
            xt:  '#33cc33',      //accent
            fg:  '#fff',         //foreground
            bg:  '#000',         //background
        },
    }

    document.documentElement.style.setProperty("--bg", schemeLib[scheme].bg);
    document.documentElement.style.setProperty("--pbg", schemeLib[scheme].pbg);
    document.documentElement.style.setProperty("--fg", schemeLib[scheme].fg);
    document.documentElement.style.setProperty("--xt", schemeLib[scheme].xt);
}

function format(str)
{
    str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, "<a href='$2'>$1</a>");

    str = str.replace(/!\*\*/gm, "</b>");
    str = str.replace(/\*\*/gm, "<b>");
    
    str = str.replace(/!\*/gm, "</i>");
    str = str.replace(/\*/gm, "<i>");
    
    str = str.replace(/:T:/gm, "<pre>");
    str = str.replace(/:\/T:/gm, "</pre>");

    str = str.replace(/\n/gm, "<br>")
    str = str.replace(/\t/gm, "&ensp;&ensp;&ensp;&ensp;");

    return str;
}

function print(msg)
{
    msg = format(msg);
    $(`.p-${currentPrompt} > #output`).append(msg);
    $(`.p-${currentPrompt} > #output`).css('color', 'var(--fg)');
}

function printErr(msg)
{
    $(`.p-${currentPrompt} > #output`).text(msg);
    $(`.p-${currentPrompt} > #output`).css('color', 'rgb(255, 100, 100)');
}

/****************************************
                info.js
****************************************/
               
function table()
{
    function info(... args) {
        print("**Leandro Lopes Marciano da Encarnação:!**\n\
        *17 y.o. IT Student at IFPR.!*\n\
        :T:\
                [Github](https://github.com/leandrolopesm)\n\n\
                Languages: \n\
            Java:       [##########]%\n\
            C:          [######### ]%\n\
            JavaScript  [########  ]%\n\
            Typescript: [########  ]%\n\
            C++:        [#####     ]%\n\
            Rust:       [####      ]%\n\
            Python:     [##        ]%\n\
            \n\
            Projects:\n\
            - Serizz: Serialization lib in pure C.\n\
            - Markov: Markov sentence generator in C++.\n\
            - Portfolio.js: Terminal-style js portfolio page.\n\
        :/T:");
    }

    return {
        ['help']: function(...args) {
            print(`Portfolio.js v${VERSION}<br>`);
            print("\nhelp [?cmd]\n\t[cmd] -> If provided, displays information only about that command.\n\tDisplays information about available programs");
            print("\nauthor / info\n\tDisplays information about the creator.");
        },
        ['author']: info,
        ['info']: info,
    }
}

/****************************************
                main.js
****************************************/
 

window.currentPrompt = 0;

let commands = table();

$(`.p-${currentPrompt} > #prompt`).on('keyup', function (e) {
    if(e.key === 'Enter' || e.keyCode === 13)
    {
        runPrompt();
    }
});

function newPrompt()
{
    $('#term-wrapper')
        .append(
            $(`<div class="p-${++currentPrompt}"></div>`)
                .append(
                    $('<label for="prompt">> </label>'),
                    $('<input type="text" name="prompt" spellcheck="false" placeholder="Type \'help\'" id="prompt">'),
                    $('<div id="output"></div>')
                )
        )

    $(`.p${currentPrompt - 1} > #prompt`).off('keyup');
    $(`.p${currentPrompt - 1} > #prompt`).prop('disabled', true);

    $(`.p-${currentPrompt} > #prompt`).on('keyup', function (e) {
        if(e.key === 'Enter' || e.keyCode === 13)
        {
            runPrompt();
        }
    });

    $(`.p-${currentPrompt} > #prompt`).focus();


    $('#term-wrapper').scroll();
}

function prompt()
{
    return $(`.p-${currentPrompt} > #prompt`).val()
}

function runPrompt()
{
    if(prompt().length <= 0) return;

    var cmdl = prompt().split(/\s+/gm);
    console.log(cmdl);

    var currentlyRunning = "run";

    try {
        var cmd = commands[cmdl[0]];
        if(cmd === undefined) throw Error(`${cmdl[0]} is not a program.`);
        
        cmd(cmdl);
    }
    catch(error)
    {
        console.log(`${currentlyRunning} faulted!`);
        console.log(error);
        printErr(`${currentlyRunning} failed: ${error.message}`);
    }

    newPrompt();

    $('html, body').animate({
        scrollTop: $(`.p-${currentPrompt}`).offset().top
    }, 1500);
}