const inquirer = require('inquirer');
require('colors');

const inquiererMenu = async() => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.cyan} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.cyan} Historial`
                },                
                {
                    value: 0,
                    name: `${'0.'.cyan} Salir\n`
                }
            ]
        }
    ]
    console.log('============================='.cyan);
    console.log(`${'|'.cyan}   ${'Seleccione una opción'.blue}   ${'|'.cyan}`);
    console.log('=============================\n'.cyan);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.blue} para continuar\n`
        }
    ];
    await inquirer.prompt(question);
        

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt( question );
    return desc;
}

const listarLugares = async( lugares = [] ) => {
        const choices = lugares.map( (lugar, index) => {
            const idx = `${++index}.`.cyan;
            return {
                value: lugar.id,
                name: `${idx} ${lugar.nombre}`
            }
        });

        choices.unshift({
            value: 0,
            name: '0.'.cyan+' Cancelar'
        });
        
        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: 'Seleccione lugar:',
                choices
            }
        ]
        const { id } = await inquirer.prompt( preguntas );
        return id;
}

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt( question );
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        const idx = `${++index}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt( pregunta );
    return ids;
}

module.exports = {
    inquiererMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}