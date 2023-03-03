const mercadopago = require("mercadopago");

const paymenMp = (req,res) => {
   
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
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
      },
    ],
    notification_url: `https://c852-190-18-180-176.sa.ngrok.io/response`
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
    console.log("response2")
    res.json("response")
}


module.exports = {paymenMp,success,response};
