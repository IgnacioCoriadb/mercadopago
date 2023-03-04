const mercadopago = require("mercadopago");
const {Product} = require('../database');

const paymenMp = async(req,res) => {

//?Aca desde el front me va a enviar un id, lo obtengo con req.params
//?con ese id hago una consulta a la bd y traigo todos los datos del producto
//?con los datos del producto completo el objeto items
const {id} = req.params;
const dataProduct =await Product.findByPk(id);
// Crea un objeto de preferencia
let preference = {
    //donde va a redireccionar despues del pago
    back_urls:{
        success: 'http://localhost:3001/success',
        // failure: "", //error
        // pending: "" //pendiente
    },
    items: [
      {
        title: dataProduct.name,
        unit_price: dataProduct.price,
        quantity: 1,
      },
    ],
    metadata: {id: dataProduct.id},
    notification_url: `https://4be1-190-18-180-176.sa.ngrok.io/response`
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        res.json(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error);
    });
}

const success = (req,res) => {
    res.json("TODO SALIÓ BIEN")
}

const response = (req, res) => {
    //  data: { id: '123456789' } ES EL ID DEL PAGO, CON ESTO VERIFICAR SI EL PAGO SE APROBÓ
    console.log(req.body.data.id)
 




    res.status(200).send("OK")
}


module.exports = {paymenMp,success,response};
