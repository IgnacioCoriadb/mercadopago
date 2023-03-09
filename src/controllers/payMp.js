const mercadopago = require("mercadopago");
const {Product} = require('../database');
const axios = require('axios');

const paymenMp = async(req,res) => {

//?Aca desde el front me va a enviar un id, lo obtengo con req.params
//?con ese id hago una consulta a la bd y traigo todos los datos del producto
//?con los datos del producto completo el objeto items
// const {id} = req.params;
// const dataProduct =await Product.findByPk(id);


// const {id} = req.body;
// console.log(id)


// // Crea un objeto de preferencia
// let preference = {
//     //donde va a redireccionar despues del pago
//     back_urls:{
//         success: 'http://localhost:3001/success',
//         // failure: "", //error
//         // pending: "" //pendiente
//     },
//     items: [
//       {
//         title:" dataProduct.name",
//         unit_price: 3,
//         quantity: 1,
//       },
//     ],
//     auto_return:"approved",
//     // metadata: {id: dataProduct.id},
//     notification_url: `https://e9f4-190-18-180-176.sa.ngrok.io/response`
//   };



//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//       res.status(200).json({global: response.body.id})

//     })
//     .catch(function (error) {
//       res.status(500).json({global:error})
//     });
// }


    const { user, turno } = req.body // or any other info needed
  // console.log("EL TURNO ES " + turno);
  // console.log("EL USER ES " + user);

    const preference = {
      // This is always true * REQUIRED
      binary_mode: true,
      // The data of the item that the user has to pay for * REQUIRED
      items: [
        {
          title: ` Nombre de la marca`,
          description: `Descripcion del producto`,
          picture_url: "url de imagen",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 4
        }
      ],
      // Data of the user * REQUIRED
      payer: {
        name: "ignacio",
        surname: "coria",
        email: "ignaciocoriadb@gmail.com"
      } ,
      // When the user finishes the payment, depending of the status of the payment he'll be redirected, you gotta put your custom urls
      back_urls: {
        success: "https://success.com",
        // failure: "https://failure.com",
        // pending: "https://pending.com"
      },
      // This is always "approved"
      auto_return: "approved",
      // notification_url: `https://e39d-190-18-180-176.sa.ngrok.io/response`

    }

    // Here we config the preference, it's like send it to MP and then its API returns a response object.
    // We just need the id from it, so we set the response to { global: response.body.id }.
    // This will send an object literal where we can access the ID for our frontend button
    mercadopago.preferences.create(preference)
      .then(function (response) {
        res.status(200).json({global: response.body.id})
      })
      .catch((error) => {
        // In an error appears, we'll send the error.
        res.status(500).json({global: error})
      })

}


const success = (req,res) => {
    res.json("TODO SALIÓ BIEN")
}

const response = async(req, res) => {
    //  data: { id: '123456789' } ES EL ID DEL PAGO, CON ESTO VERIFICAR SI EL PAGO SE APROBÓ
  const {type, data:{id}} = req.body;

  const compra = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`,
  {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer APP_USR-4438781963059976-030309-3bd72b60e7cc790cccdc686f0320e5cc-1322314806`
    }
  });


    if(type === "payment" && compra.data.status === "approved" && compra.data.status_detail ==="accredited"){
      
      console.log("Pago acreditado")
      res.status(200).send('OK');

    }
    // res.status(200).send('OK');

}


module.exports = {paymenMp,success,response};
