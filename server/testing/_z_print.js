import { PORT_TO_CONTAINER, CONTAINER_TO_PORT } from './_z_create.js';

// Function to print the maps
export function f2() {
    console.log('File 2: Accessing shared maps');
    console.log(PORT_TO_CONTAINER.get('8001')); // Expected: 'container_1'
    console.log(CONTAINER_TO_PORT.get('container_2')); // Expected: '8000'
}
