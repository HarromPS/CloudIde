import { PORT_TO_CONTAINER, CONTAINER_TO_PORT } from './_z_create.js';

// Function to update the maps
export function f1() {
    PORT_TO_CONTAINER.set('8001', 'container_2');
    CONTAINER_TO_PORT.set('container_2', '8001');
    console.log('File 1: Updated maps in f1');
    console.log(PORT_TO_CONTAINER);
    console.log(CONTAINER_TO_PORT);
}
