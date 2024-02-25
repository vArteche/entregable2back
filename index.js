const fs = require('fs');

class ProductManager{
    constructor(){
        this.products = [],
        this.path = "./products.txt";
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'));
    }

    fileGenerator (){
        fs.writeFile(this.path, "", (error)=>{
            if (error) return console.error("ERROR al escribir el archivo")
        });
    }

    addProduct ({ title, description, price, thumbnail, code, stock }) {
         // Validar campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.error('Complete los campos obligatorios del nuevo producto.');
            return;
        }

        // Encontrar repeticiones de n° de código
        if (this.products.some(product => product.code === code)){
            console.error('Este código de producto ya se encuentra registrado.');
            return;
        }

        // Generador de ID
        const id = this.products.length + 1;

        // Agregar el producto a la lista
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);

        let strProducts = JSON.stringify(this.products , null, '\t')
        fs.writeFile(this.path, strProducts, (error)=>{
            if (error) return console.error('ERROR al escribir el producto')

        })
        console.log( `Producto "${newProduct.title}" agregado correctamente`);
    };

    getProducts(){
            fs.readFile(this.path, "utf-8", (error, result) =>{
            if (error) return console.log("ERROR al leer el archivo");
            console.log(JSON.parse(result))
            return 
        })
    
    }


    getProductById(id) {
                const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }

    //actualizar producto

    updateProduct(id, field){
        let selected = this.products.find((product) => product.id === id);


    }
}
// Uso

const manager = new ProductManager();
// console.log(manager.getProducts()); UNDEFINED

const productData = {
    title: "Camiseta",
    description: "Camiseta de algodón",
    price: 19.99,
    thumbnail: "camiseta.jpg",
    code: "C001",
    stock: 50,
};
manager.addProduct(productData);

const productData2 = {
    title : "Pantalón",
    description : "Pantalón vaquero",
    price : 31.99,
    thumbnail : "pantalon.jpg",
    code:  "C002",
    stock : 36,

};
manager.addProduct(productData2);
const productList = () => manager.getProducts();

productList();


const getById = manager.getProductById(1);
console.log(getById);
