import http from 'http';
import fs from 'fs';

const app = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end('Welcome to Dashboard');
    } else if (req.url == '/products' && req.method == 'GET') {
        const jsonString = fs.readFileSync('data.json', 'utf-8');
        const parsedData = JSON.parse(jsonString);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedData.data));
    } else if (req.url == '/products' && req.method == 'POST') {
        let body = '';

        req.on('data', chunks => {
            body += chunks.toString();
        });

        req.on('end', () => {
            const newProduct = JSON.parse(body);

            const jsonString = fs.readFileSync('data.json', 'utf-8');
            const parsedData = JSON.parse(jsonString);

            parsedData.data.push(newProduct);

            fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 2));

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product added successfully' }));
        })

    } else if (req.url.startsWith('/products/') && req.method == 'PUT') {
        const id = +req.url.split('/')[2];
        let body = '';
        req.on('data', chunks => {
            body += chunks.toString();
        });

        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const jsonString = fs.readFileSync('data.json', 'utf-8');
            const parsedData = JSON.parse(jsonString);

            const index = parsedData.data.findIndex(elem => elem.id == id);

            if (index === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Product not found' }));
                return;
            }

            parsedData.data[index] = { ...parsedData.data[index], ...updatedData };

            fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 2));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product updated successfully' }));
        })

    }else if(req.url.startsWith('/products/') && req.method == 'DELETE'){
        const id = +req.url.split('/')[2];
        const jsonString = fs.readFileSync('data.json','utf-8');
        const parsedData = JSON.parse(jsonString);

        parsedData.data = parsedData.data.filter(elem => elem.id !== id);

        fs.writeFileSync('data.json',JSON.stringify(parsedData, null, 2));

        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify({message:"Product Delete Successfully"}));
    }

});


app.listen(3030, () => {
    console.log('Server is running on 3030');
});