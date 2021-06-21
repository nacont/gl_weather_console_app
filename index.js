require('dotenv').config();

const { leerInput, 
        inquiererMenu,
        pausa,
        listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    // CREO UNA INSTANCIA DE LA CLASE BÚSQUEDAS, POR FUERA DEL do/while PARA QUE SE MANTENGA Y NO SE REINICIE EN CADA CICLO
    const busquedas = new Busquedas();
    
    let opt = '';    
    
    do {
        
        opt = await inquiererMenu();        
        
        switch (opt) {
            case 1:
                // MOSTRAR MENSAJE PARA QUE LA PERSONA ESCRIBA
                const termino = await leerInput('Ciudad: ');
                // BUSCAR LUGARES
                const lugares = await busquedas.ciudad( termino );
                // SELECCIONAR EL LUGAR
                const id = await listarLugares( lugares );                
                if( id === 0 ) continue;
                const lugarSeleccionado = lugares.find( lugar => lugar.id === id);
                // GUARDAMOS EN DB
                busquedas.agregarHistorial( lugarSeleccionado.nombre );
                // CLIMA
                const clima = await busquedas.climaLugar( lugarSeleccionado.latitud, lugarSeleccionado.longitud );

                // MOSTRAR RESULTADOS
                console.log(`${'\nInformación de la ciudad\n'.blue}`);
                console.log(`${'Ciudad:'.cyan} ${lugarSeleccionado.nombre}`);
                console.log(`${'Latitud:'.cyan} ${lugarSeleccionado.latitud}`);
                console.log(`${'Longitud:'.cyan} ${lugarSeleccionado.longitud}`);
                console.log(`${'Temperatura:'.cyan} ${clima.temp}`);
                console.log(`${'Máxima:'.cyan} ${clima.max}`);
                console.log(`${'Mínima:'.cyan} ${clima.min}`);
                console.log(`${'Como está el clima:'.cyan} ${clima.desc}`);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( ( busqueda, index ) => {
                    const idx = `${++index}.`.cyan;
                    console.log(`${idx} ${busqueda}`);
                })
                break;            
            case 0:
                console.log('Salir');
                break;            
        }        
        
        if(opt !== 0)
            await pausa();

    } while (opt !== 0);

}
main();