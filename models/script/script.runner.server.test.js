//var number = require('../statement/number-statement.impl.server');

var statements = [
    {
        label:'start',
        type:'NUMBER',
        operation:'ADDITION',
        input:[
            {variable:'A'},
            {literal: 23}],
        output:'C'
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[{literal: 'A ='}]
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[{variable: 'A'}]
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[{literal: 'A plus 23 ='}]
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[{variable: 'C'}]
    },
    {
        type: 'STRING',
        operation: 'CONCATENATE',
        input: [
            {variable: 'tobe'},
            {literal: ' Or Not To Be'}
        ],
        output: 'result'
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[{variable: 'result'}]
    },
    {
        type: 'NUMBER',
        operation: 'VARIABLE',
        input:[{literal: 23}],
        output:'age'
    },
    {
        type: 'NUMBER',
        operation: 'GREATER_THAN',
        input:[{variable: 'age'}, {literal: 21}],
        output: 'adult'
    },
    {
        type: 'FLOW',
        operation: 'IF',
        input:[
            {variable: 'adult'},
            {literal: 'candrink'},
            {literal: 'cantdrink'}
        ]
    },
    {
        label: 'cantdrink',
        type: 'CONSOLE',
        operation: 'LOG',
        input:[
            {literal: 'Cant Drink'}
        ]
    },
    {
        label: 'candrink',
        type: 'CONSOLE',
        operation: 'LOG',
        input:[
            {literal: 'Can Drink'}
        ]
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[
            {literal: 'Count to 10'}
        ]
    },
    {
        type: 'NUMBER',
        operation: 'VARIABLE',
        input:[{literal: 0}],
        output:'i'
    },
    {
        label:'addone',
        type:'NUMBER',
        operation:'ADDITION',
        input:[
            {variable:'i'},
            {literal: 1}],
        output:'i'
    },
    {
        type: 'CONSOLE',
        operation: 'LOG',
        input:[
            {variable: 'i'}
        ]
    },
    {
        type: 'NUMBER',
        operation: 'GREATER_THAN',
        input:[{variable: 'i'}, {literal: 10}],
        output: 'done'
    },
    {
        type: 'FLOW',
        operation: 'IF',
        input:[
            {variable: 'done'},
            {literal: 'stop'},
            {literal: 'addone'}
        ]
    },
    {
        label: 'stop',
        type: 'CONSOLE',
        operation: 'LOG',
        input:[
            {literal: 'done'}
        ]
    }
];

var script = {
    statements: statements
};

var model = {
    A: 2,
    B: 4,
    tobe: 'To Be'
};

var runner = require('../script/script.runner.server')();
runner.run(script, model);
console.log(model);