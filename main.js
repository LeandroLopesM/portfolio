if(typeof JQuery === undefined)
{
    throw Error("JQuery wasn't loaded correctly!");
}

/****************************************
                utils.js
****************************************/

const VERSION = "1.0.2";

function format(str)
{
    str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, "<a href='$2'>$1</a>");
    
    str = str.replace(/\{([^\}]+)\}\(([^)]+)\)/gm, "<span style=\"color: $2;\">$1</span>");
    
    str = str.replace(/[^\\]<([^>]+)>\(([^)]+)\)/gm, "<span style=\"$2\">$1</span>");
    str = str.replace(/!\*\*/gm, "</b>");
    str = str.replace(/\*\*/gm, "<b>");
    
    str = str.replace(/\*([^\n]+)\*/gm, "<i>$1</i>");
    // str = str.replace(/!\*/gm, "</i>");
    // str = str.replace(/\*/gm, "<i>");
    
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
    function info(args) {
        function projectInfo() {
            print("\
            <Projects>(font-size: 1rem)\n:T:\
         - **LibSerizz!** - Single-header serializaiton library:\n\
            > Pure C    > Malloc-like API   > Managed by simple FS\n\
         - **Markov!** - Tiny Markov sentence generation implementation\n\
            > C++       > -O3, sub 10s generation\n\
         - **Portfolio.js!** - A small terminal-like input with hardcoded commands\n\
            > Single-file:/T:")
        }

        function authorInfo() {
            print("<Leandro Lopes M. da Encarnação>(font-size: 1rem; color: var(--xt)\n\
            \t17 y.o.\n\
            \t**Programming interests:!**\n\
            \t\t- Operating systems programming\n\
            \t\t- Language interpretation\n\
            \t\t- Kernel development")
        }

        function edInfo() {
            print("<Education>(font-size: 1rem; color: var(--xt)\n\
            \tEnsino fundamental I:  Várias escolas\n\
            \tEnsino fundamental II: Colégio Estadual João Rodrigues da Silva\n\
            \tEnsino Médio: Instituto Federal do Paraná (Em andamento...)\n")
        }


        if(args.length <= 1) {
        print("<Leandro Lopes Marciano da Encarnação:>(font-size: 2rem; color: #aaffaa)\n\
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
        :/T:\n\t\t**Available information for:**\n\t\t'projects', 'author', 'education'");
        }
        else {
            switch(args[1])
            {
                case "projects": 
                    projectInfo(); break;
                case "author": 
                    authorInfo(); break;
                case "education": 
                    edInfo(); break;
                default: throw Error(`Unknown subject ${args[1]}`)
            }

        }
    }

    function docs(args) {
        if(args.length <= 1) {
            print("Available documentation: serizz, markov, portfolio")
            return;
        }
        switch(args[1]) {
            case "portfolio": {
                print("\t<Portfolio.js>(font-size: 1rem; color: var(--xt)\n\n\
                **I. Overview!**\n\n\
                \tIs a javascript program contained ina  single file\n\
                whose pourpose is to invoke the idea of a terminal\n\
                prompt.\n\n\
                \
                **II. Internals!**\n\n\
                \tIt works by using JQuery to add a listener to an\n\
                input element, capturing it once [Enter] is\n\
                pressed. It then simply runs the command, removes\n\
                the listener, creates a new prompt below it and adds\n\
                a listener to that one.\n\n\
                \t It also harbors a fairly extensive formatting system\n\
                i made for myself for quality-of-life's sake.\n\n\
                \
                III. Graphically \n\n\
                :T:\n\
                PageLoad -> [div.p-0 created] -> [input ends with Enter] ->\n\
                [run command] -> [new div.p-?] -> [div.p-0.off('keydown')] ->\n\
                [div.p-?.on('keydown')] ...Repeat\n\
                :/T:") 
            } break;
            case "markov": {
                print("\t<markov.cpp>(font-size: 1rem; color: var(--xt)\n\n\
                **I. Overview!**\n\n\
                \tIt takes in a file as a 'sample' and weighs it. It then uses\n\
                a weighed random function to determine how words should be\n\
                ordered in the final sentence.\n\
                \n\
                **III. Internals!**\n\n\
                \tThe program first reads the entire file and tokenizes it (Splits\n\
                it into an array of words). It then goes through every word and\n\
                builds an array of nodes, one for each word and each with a \n\
                'path mapping' as i call it, a map of the probability of each word that node's word.\n\
                \n\tThe least optimized part is the 'tree trimming', wherein after we map all words to one another \n\
                i go through every path map and remove any paths whose weight is less than a specified threshold.\n\
                This is necessary to reduce memory usage and loop duration when generating the final string.\n\
                After that it simply choses a random starting node and follows it's paths with the highest weights\n\
                (With the use of a slight random number to add randomness);\n")
            } break;
            case "serizz": {
                print("\t<Serizz.h>(font-size: 1rem; color: var(--xt)\n\n\
                **I. Overview!**\n\n\
                \tThis library seeks to implement multiple variable serialization in pure C without extra syntax sugar some other serialization libraries include.\n\n\
                **II. Internals!**\n\n\
                *II.1 Structure*\n\n\
                \tInside the memory structure is a byte array called .vhd (analogy for VirtualHardDrive), this array is split into 3 parts\n\
                \t- *The first 4 bytes are reserved for the Object Counter*\n\
                \t\t> The object counter keeps track of how many objects are\n\
                \t\t> in the vhd in this moment, necessary since the last object is indexed by \n\
                \t\t> sizeof(objHeader) * object_count.\n\
                \t\t> (Also it is useful for transportation of the final serialized object)\n\
                \t*- 1/4 of the total size is reserved for Object headers*\n\
                \t\t> Object headers contain the strictly necessary information about an object\n\
                \t\t> such as it's offset within the vhd and size\n\
                \t*- The rest of the space is simply data storage*\n\n\
                *II.2 Operation*\n\n\
                \tWhen pushing an object, a handle is returned. This is a simple integer which\n\
                represents the object within the VHD and can be used to quickly retrieve it (Without\n\
                it, it is quite hard to find objects again. Luckily, it also represents the index\n\
                of it so if you remember that, you remember your handle)\n\
                :T:\n\
                MEMORY(main) // Optional macro, removes the arg get(memory, handle) and prefixes\n\
                the functions to main_get(handle)\n\
                struct user {...};\n\
\n\
                user ethan {...};\n\
                int handle = main_push(ethan, sizeof(user));\n\
                user copy = main_get(handle);\n\
                :/T:");
            }
        }
    }

    function contact(args)
    {
        print("\t[EMAIL](mailto:leandrolopes.tinfem2023@gmail.com)\t[GITHUB](https://github.com/leandrolopesm)");
        print("\t\n\n");
    }

    return {
        ['help']: function(...args) {
            print(`Portfolio.js v${VERSION}<br>`);
            print("\n*help*\n\t> Displays information about available programs");
            print("\n*info [?subject]*\n\t> Shows information about miscellaneous topics.\n\t\t> ?subject -> Shows further detailed information regarding a specific subject");
            print("\n*docs ?project*\n\t> Displays documentation regarding a project.\n\t\t> ?project -> if not provided, lists available options");
            print("\n*contact*\n\t> Displays contact information.");
        },
        ['info']: info,
        ['docs']: docs,
        ['contact']: contact,
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

    $("#term-wrapper").animate({ scrollTop: $("#term-wrapper").height() }, 1000);
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