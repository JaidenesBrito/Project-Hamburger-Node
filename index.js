const { request, response, } = require('express')
const express = require('express')
const uuid = require('uuid')


const port = 3000
const app = express()
app.use(express.json())


const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not faund" })
    }
    request.userIndex = index
    request.userId = id

    next()
}

const requests = (request, response, next) => {

    console.log(request.method, request.url)

    next()
}

const orders = []


app.get('/orders', requests, (request, response) => {

    return response.json(orders)

})

app.post('/orders', requests, (request, response) => {
    const { order, clientName, price, status } = request.body

    const clientId = { id: uuid.v4(), order, clientName, price, status }

    orders.push(clientId)

    return response.status(201).json(clientId)
})

app.put('/orders/:id', checkUserId, requests, (request, response) => {
    const { order, clientName, price, status } = request.body
    const id = request.userId
    const index = request.userIndex

    const updatedUser = { id, order, clientName, price, status }

    orders[index] = updatedUser

    return response.json(updatedUser)

})

app.delete('/orders/:id', checkUserId, requests, (request, response) => {
    const index = request.userIndex

    orders.splice(index, 1)

    return response.status(204).json()

})

app.get('orders/:id', checkUserId, requests, (request, response) => {
    const index = request.userIndex
   
    const order = orders[index]

    return response.json(order)

})

app.patch('/orders/:id', checkUserId, requests, (request, response) => {
    const { order, clientName, price, status } = request.body
    const id = request.userId
    const index = request.userIndex

    const updatedUser = { id, order, clientName, price, status }

    orders[index] = updatedUser

    return response.json(updatedUser)
})

app.listen(port, () => {
    console.log(`🚀 server started on port ${port}`)
})




