import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  vus: 1100,
  duration: '30s',
};

// export default function () { //obtain list of different products
//   let count = Math.floor(Math.random() * 15);
//   let page = Math.floor(Math.random() * 100);

//   // let count = 5;
//   // let page = 1;

//   const localURL = `http://localhost:3000/data/products?page=${page}&count=${count}`
//   http.get(localURL);
//   sleep(1);
// }

export default function () { //for feature of specific product
  const max = 1000011;
  const min = 900000;
  const product_id = Math.floor(Math.random() * (max - min) + min);

  const localURL = `http://localhost:3000/data/products/${product_id}`
  http.get(localURL);

  sleep(1);
}


// export default function () { //for styles of individual product
//   const max = 1000011;
//   const min = 900000;
//   const product_id = Math.floor(Math.random() * (max - min) + min)



//   const localURL = `http://localhost:3000/data/products/${product_id}/styles`
//   http.get(localURL);

//   sleep(1);
// }


// export default function () { //for related product
//   const max = 1000011;
//   const min = 900000;
//   const product_id = Math.floor(Math.random() * (max - min) + min)
//   // let product_id = 956384;



//   const localURL = `http://localhost:3000/data/products/${product_id}/related`
//   http.get(localURL);
//   sleep(1);

// }