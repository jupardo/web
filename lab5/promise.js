 function fetch(url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => {
      console.log(req.status);
      if (req.status === 200) {
        //Success. Response in req.response
        resolve(req.response);
      } else {
        //Error. Response in req.statusText
        reject(req.statusText);
      }
    }
    req.send();
  })
};

async function maspedido() {
  return new Promise(async (resolve, reject) => {
    try {
      let productos = JSON.parse(await fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json'));
      let compraproducto = JSON.parse(await fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json'));
      productos = productos.map(producto => {
        let filtered = compraproducto.filter((compra) => producto.idproducto === compra.idproducto);
        producto.totalSum = filtered.reduce((accum, current) => accum + Number(current.cantidad), 0);
        return producto;
      });
      let masVendido = null;
      productos.forEach(producto => {
        if(!masVendido || masVendido.totalSum < producto.totalSum) {
          masVendido = producto;
        }
      })
      resolve(masVendido);
    } catch(error) {
      console.error(error);
    }
  });
}

maspedido().then((result) => console.log(result)).catch(console.error);
