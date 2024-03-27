
import mysql from 'mysql2/promise';



export async function Senddata(data){

    const connection = await mysql.createConnection({
        user: 'd110073_acuser',
        host: 'd110073.mysql.zonevs.eu',
        database: 'd110073_acdata',
        password: 'u7Drmx]?8f#HVVt',
      });

}

