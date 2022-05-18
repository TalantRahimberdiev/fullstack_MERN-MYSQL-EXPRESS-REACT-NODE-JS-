

//--------------BASIC SETUP------------------------------------------------------------------------

const mysql = require('mysql2')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
   user: 'root',
   host: 'localhost',
   password: 'rt240793',
   database: 'kp_1'
})

//-------------------------RAZDEL POSTAVSHIKI---------------------------------------------------------

// CREATE POSTAVSHIK

app.post(`/createPostavshik`, (req, res) => {

   const organization = req.body.organization
   const address = req.body.address
   const manager = req.body.manager
   const costController = req.body.costController
   const bankRequisites = req.body.bankRequisites

   db.query(`INSERT INTO postavshiki(organization,address,manager,costController,bank_account) VALUE(?,?,?,?,?);`, [organization, address, manager, costController, bankRequisites], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//READ POSTAVSHIK

app.get(`/spisokPostavshikov`, (req, res) => {
   db.query(`SELECT * FROM postavshiki;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//UPDATE POSTAVSHIK

app.post(`/updatePostavshik`, (req, res) => {
   const organization = req.body.organization
   const address = req.body.address
   const manager = req.body.manager
   const costController = req.body.costController
   const bank = req.body.bank_account
   const token = req.body.token

   db.query(`UPDATE postavshiki SET organization=?, address=?, manager=?, costController=?, bank_account=? WHERE id=?;`, [organization, address, manager, costController, bank, token], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET POSTAVSHIK BY ID

app.get(`/getPostavshikById/:selected`, (req, res) => {
   db.query(`SELECT organization,address,manager,costController,bank_account FROM postavshiki WHERE id=?`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//DELETE POSTAVSHIK

app.delete(`/deletePostavshik/:token`, (req, res) => {
   db.query(`DELETE FROM postavshiki WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
   })
})


// CREATE DOGOVOR POSTAVKI

app.post(`/createDogovorPostavki`, (req, res) => {

   const id = req.body.id
   const day = req.body.day
   const month = req.body.month
   const year = req.body.year
   const text = req.body.text

   db.query(`INSERT INTO dogovor_postavki(id_postavshik,text,day,month,year) VALUE(?,?,?,?,?)`, [id, text, day, month, year], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})


//READ DOGOVOR POSTAVKI

app.get(`/spisokDogovorovPostavki`, (req, res) => {
   db.query(`select dp.id, dp.id_postavshik, p.organization, p.manager, dp.text, dp.day, dp.month, dp.year 
   from dogovor_postavki dp 
   inner join postavshiki p on p.id=dp.id_postavshik`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//UPDATE DOGOVOR POSTAVKI

app.post(`/updateDogovorPostavki`, (req, res) => {

   const text = req.body.text
   const id = req.body.id
   const token = req.body.token

   db.query(`UPDATE dogovor_postavki SET text=?,id_postavshik=? WHERE id=?;`, [text, id, token], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET DOGOVOR POSTAVKI BY ID

app.get(`/getDogovorPostavkiById/:selected`, (req, res) => {
   db.query(`SELECT id, id_postavshik,text FROM dogovor_postavki WHERE id=?`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//DELETE DOGOVOR POSTAVKI 

app.delete(`/deleteDogovorPostavki/:token`, (req, res) => {
   db.query(`DELETE FROM dogovor_postavki WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
   })
})

//CREATE TOVAR

app.post(`/createTovar`, (req, res) => {

   const product = req.body.product
   const unit = req.body.unit

   db.query(`INSERT INTO tovar(product,unit) VALUE(?,?)`, [product, unit], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ TOVAR

app.get(`/spisokTovarov`, (req, res) => {
   db.query(`SELECT * FROM tovar;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ  DOSTUPNIYE TOVAR

app.get(`/spisokDostupnihTovarov`, (req, res) => {
   db.query(`SELECT * FROM tovar where dostupen='da';`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ  TOTALCOST OF TOVAR

app.get(`/totalCostOfTovar`, (req, res) => {
   db.query(`SELECT SUM(totalCost) FROM zakaz_postavki WHERE waspaid='da';`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//UPDATE TOVAR

app.post(`/updateTovar`, (req, res) => {

   const product = req.body.product
   const unit = req.body.unit
   const token = req.body.token

   db.query(`UPDATE tovar SET product=?, unit=? WHERE id=?;`, [product, unit, token], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//GET TOVAR BY ID

app.get(`/getTovarById/:selected`, (req, res) => {
   db.query(`SELECT * FROM tovar WHERE id=?;`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//DELETE TOVAR

app.delete(`/deleteTovar/:token`, (req, res) => {
   db.query(`DELETE FROM tovar WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
   })
})

//CREATE ZAKAZ POSTAVKI

app.post(`/createZakazPostavki`, (req, res) => {

   const idTovar = req.body.idTovar
   const idDogovor = req.body.idDogovor
   const quantity = req.body.quantity
   const price = req.body.price
   const totalCost = req.body.totalCost

   db.query(`INSERT INTO zakaz_postavki(id_tovar,id_dogovor,quantity,price,totalCost) VALUE(?,?,?,?,?)`, [idTovar, idDogovor, quantity, price, totalCost], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//GET POSTAVSHIKS DOGOVORS_IDS

app.get(`/postavshikIdsOfDogovors/:selected`, (req, res) => {
   db.query(`SELECT id FROM dogovor_postavki WHERE id_postavshik=?;`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ ZAKAZY POSTAVKI

app.get(`/spisokZakazovPostavki`, (req, res) => {
   db.query(`select zp.id,dp.id_postavshik,p.organization, t.product, zp.id_dogovor, zp.quantity, zp.price,zp.totalCost, zp.wasPaid 
   from zakaz_postavki zp 
   inner join tovar t on t.id=zp.id_tovar
   inner join dogovor_postavki dp on zp.id_dogovor=dp.id
   inner join postavshiki p on dp.id_postavshik=p.id
   `, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET ZAKAZY POSTAVKI BY ID

app.get(`/getZakazPostavkiById/:selected`, (req, res) => {
   db.query(`select zp.id, zp.id_tovar, t.product, zp.id_dogovor, zp.quantity, zp.price,zp.totalCost, zp.wasPaid 
   from zakaz_postavki zp 
   inner join tovar t on t.id=zp.id_tovar where zp.id=?;`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//UPDATE ZAKAZ POSTAVKI

app.post(`/updateZakazPostavki`, (req, res) => {

   const token = req.body.token
   const idTovar = req.body.idProduct
   const idDogovor = req.body.idDogovor
   const quantity = req.body.quantity
   const price = req.body.price
   const totalCost = req.body.totalCost

   db.query(`UPDATE zakaz_postavki SET id_tovar=?, id_dogovor=?, quantity=?, price=?, totalCost=? WHERE id=?;`, [idTovar, idDogovor, quantity, price, totalCost, token], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//DELETE ZAKAZ POSTAVKI

app.delete(`/deleteZakazPostavki/:token`, (req, res) => {
   db.query(`DELETE FROM zakaz_postavki WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
   })
})

// READ UNPAID SHETA

app.get(`/unpaidSheta`, (req, res) => {
   db.query(`SELECT * FROM zakaz_postavki WHERE wasPaid IS NULL;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ PAID SHETA

app.get(`/paidSheta`, (req, res) => {
   db.query(`SELECT zp.id, zp.id_tovar, zp.id_dogovor, zp.quantity,zp.price,zp.totalCost,zp.wasPaid,sp.day,sp.month,sp.year
   from zakaz_postavki zp 
   inner join sheta_postavki sp on sp.id_zakaz_postavki=zp.id 
   WHERE zp.wasPaid='da';`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//PAY SHETA POSTAVKI

app.post(`/payShetaPostavki`, (req, res) => {

   const listMonthes = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ')

   const currentZakaz = req.body.token
   const summa = req.body.summa
   const date = req.body.date
   const month = listMonthes[req.body.month]
   const year = req.body.year

   db.query(`INSERT INTO sheta_postavki(id_zakaz_postavki, paid,day, month, year) VALUE(?,?,?,?,?)`, [currentZakaz, summa, date, month, year], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

app.post(`/updateTovarsQuantityAndDostupen`, (req, res) => {

   const idTovar = req.body.idTovar
   const quantity = req.body.sum

   db.query(`UPDATE tovar SET quantity=?,dostupen=? WHERE id=?;`, [quantity, 'da', idTovar], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

app.post(`/updateZakazPostavkiWasPaid`, (req, res) => {

   const idZakaz = req.body.idZakaz

   db.query(`UPDATE zakaz_postavki SET wasPaid=? WHERE id=?;`, ['da', idZakaz], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//-------------------------RAZDEL CLIENTURA---------------------------------------------------------

// CREATE CLIENT

app.post(`/createCLient`, (req, res) => {

   const firstname = req.body.firstname
   const lastname = req.body.lastname
   const contacts = req.body.contacts
   const address = req.body.address

   db.query(`INSERT INTO clients(firstname,lastname,contacts,address) VALUE(?,?,?,?);`, [firstname, lastname, contacts, address], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ CLIENT

app.get(`/spisokClientov`, (req, res) => {
   db.query(`SELECT * FROM clients;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//CREATE ZAKAZ CLIENTA

app.post(`/createZakazClienta`, (req, res) => {

   const [day, month, year, idTovar, idClient, quantity, price, totalCost] = [req.body.day, req.body.month, req.body.year, req.body.idTovar, req.body.idClient, req.body.quantity, req.body.price, req.body.totalCost]

   db.query(`INSERT INTO zakaz_clienta(day, month, year, id_tovar, id_client, quantity, price, totalCost) VALUE(?,?,?,?,?,?,?,?)`, [day, month, year, idTovar, idClient, quantity, price, totalCost], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ CLIENTSKIE ZAKAZY

app.get(`/spisokClientskihZakazovv`, (req, res) => {
   db.query(`SELECT * FROM zakaz_clienta;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ CLIENTSKIE ZAKAZY

app.get(`/spisokClientskihZakazov`, (req, res) => {
   db.query(`SELECT zc.id, zc.day, zc.month, zc.year, zc.id_client, c.lastname, c.contacts, t.product, zc.quantity, zc.price, zc.totalCost, zc.wasPaid
   from zakaz_clienta zc
   inner join tovar t on t.id=zc.id_tovar
   inner join clients c on c.id=zc.id_client
   ;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//PAY SHETA CLIENTA

app.post(`/payShetaClienta`, (req, res) => {

   const currentZakaz = req.body.token
   const summa = req.body.summa

   db.query(`INSERT INTO sheta_clienta(id_zakaz_clienta, paid) VALUE(?,?)`, [currentZakaz, summa], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

app.post(`/updateTovarsQuantityAndDostupen`, (req, res) => {

   const idTovar = req.body.idTovar
   const quantity = req.body.sum

   db.query(`UPDATE tovar SET quantity=?,dostupen=? WHERE id=?;`, [quantity, 'da', idTovar], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

app.post(`/updateZakazClientaWasPaid`, (req, res) => {

   const idZakaz = req.body.idZakaz

   db.query(`UPDATE zakaz_clienta SET wasPaid=? WHERE id=?;`, ['da', idZakaz], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ ZAKAZY CLIENTA

app.get(`/spisokZakazovClienta`, (req, res) => {
   db.query(`select zc.id, zc.id_tovar, t.product, zc.quantity, zc.price,zc.totalCost, zc.wasPaid 
   from zakaz_clienta zc 
   inner join tovar t on t.id=zc.id_tovar`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET ZAKAZY CLIENTA BY ID

app.get(`/getZakazClientaById/:selected`, (req, res) => {
   db.query(`select zc.id, zc.id_tovar, t.product, zc.quantity, zc.price,zc.totalCost, zc.wasPaid 
   from zakaz_clienta zc 
   inner join tovar t on t.id=zc.id_tovar where zc.id=?;`, req.params.selected, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ UNPAID SHETA CLIENTOV

app.get(`/unpaidShetaClientov`, (req, res) => {
   db.query(`SELECT * FROM zakaz_clienta WHERE wasPaid IS NULL;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// READ PAID SHETA CLIENTOV

app.get(`/paidShetaClientov`, (req, res) => {
   db.query(`SELECT * FROM zakaz_clienta WHERE wasPaid='da';`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})


// GET CLIENTSKIYE SHETA BY DAY/MONTH/YEAR

app.get(`/dailySales/:date`, (req, res) => {
   const date = req.params.date.split(',')
   db.query(`SELECT * FROM zakaz_clienta WHERE day=? AND month=? AND year=? AND waspaid=?;`, [date[0], date[1], date[2], 'da'], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET CLIENTSKIYE SHETA BY DECADE/MONTH/YEAR

app.get(`/decadeSales/:date`, (req, res) => {
   const date = req.params.date.split(',')
   if (+date[0] == 1) {
      db.query(`SELECT * FROM zakaz_clienta WHERE day>0 AND day<11 AND month=? AND year=? AND waspaid=?;`, [date[1], date[2], 'da'], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
   else if (+date[0] == 2) {
      db.query(`SELECT * FROM zakaz_clienta WHERE day>10 AND day<21 AND 20 AND month=? AND year=? AND waspaid=?;`, [date[1], date[2], 'da'], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
   else {
      db.query(`SELECT * FROM zakaz_clienta WHERE day>20 AND day<33 AND month=? AND year=? AND waspaid=?;`, [date[1], date[2], 'da'], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
})

// GET CLIENTSKIYE SHETA BY MONTH/YEAR

app.get(`/monthlySales/:date`, (req, res) => {
   const date = req.params.date.split(',')
   db.query(`SELECT * FROM zakaz_clienta WHERE month=? AND year=? AND waspaid=?;`, [date[0], date[1], 'da'], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET CLIENTSKIYE SHETA BY YEAR

app.get(`/yearlySales/:year`, (req, res) => {

   db.query(`SELECT * FROM zakaz_clienta WHERE year=? AND waspaid=?;`, [req.params.year, 'da'], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET SUPPLY BY DAY/MONTH/YEAR

app.get(`/dailySupply/:date`, (req, res) => {
   const date = req.params.date.split(',')
   db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
   FROM sheta_postavki sp
   inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
   inner join tovar t on t.id=zp.id_tovar
   where sp.day=? AND sp.month=? AND sp.year=?;`, [date[0], date[1], date[2]], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})


// GET SUPPLY BY DECADE/MONTH/YEAR

app.get(`/decadeSupply/:date`, (req, res) => {
   const date = req.params.date.split(',')
   if (+date[0] == 1) {
      db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
      FROM sheta_postavki sp
      inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
      inner join tovar t on t.id=zp.id_tovar
      where sp.day>0 AND sp.day<11 AND sp.month=? AND sp.year=?;`, [date[1], date[2]], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
   else if (+date[0] == 2) {
      db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
      FROM sheta_postavki sp
      inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
      inner join tovar t on t.id=zp.id_tovar
      where sp.day>10 AND sp.day<21 AND sp.month=? AND sp.year=?;`, [date[1], date[2]], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
   else {
      db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
      FROM sheta_postavki sp
      inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
      inner join tovar t on t.id=zp.id_tovar
      where sp.day>20 AND sp.day<33 AND sp.month=? AND sp.year=?;`, [date[1], date[2]], (err, result) => {
         if (err) console.log(err)
         else res.send(result)
      })
   }
})

// GET SUPPLY BY MONTH/YEAR

app.get(`/monthlySupply/:date`, (req, res) => {
   const date = req.params.date.split(',')
   db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
   FROM sheta_postavki sp
   inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
   inner join tovar t on t.id=zp.id_tovar
   where sp.month=? AND sp.year=?;`, [date[0], date[1]], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

// GET SUPPLY BY YEAR

app.get(`/yearlySupply/:year`, (req, res) => {
   db.query(`SELECT sp.id,sp.day, sp.month,sp.year, sp.id_zakaz_postavki,zp.id_tovar,t.product, zp.quantity, zp.price, zp.totalCost 
   FROM sheta_postavki sp
   inner join zakaz_postavki zp on zp.id=sp.id_zakaz_postavki
   inner join tovar t on t.id=zp.id_tovar
   where sp.year=?;`, req.params.year, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})





app.listen(7000, () => console.log('great server runs on port 7000'))

