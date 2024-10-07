import fs from 'fs';


export const createFile = () => {
    fs.writeFileSync('test.txt', 'Hello, World!');
}
