import {print, printErr, VERSION} from 'utils.js'

export function table()
{
    return {
        help: function(...args) {
            print(`Portfolio.js v${VERSION}<br>`);
            for( member of this )
            {
                print(`${member.args}\n\t${member.name}: ${member.help}`);
            }
        }
    }
}