import Cart from "../model/cart.model.js";
import OrderItem from "../model/order-item.model.js";
import OrderDetails from "../model/order.model.js";
export const save = (request, response, next) => {
    let cartItems = JSON.parse(request.body.cartItems);
    console.log(request.body);
    let totalBillAmount = cartItems.reduce((previous, current) => {
        return previous + current.price * current.qty;
    }, 0);
    const { contactPerson, contactNumber, delieveryAddress } = request.body;
    let date = new Date().toString().substring(4, 15).replaceAll(' ', '-');
    let userId = request.session.user.id;
    let paymentMode = "COD";
    let orderId = Date.now();
    let order = new OrderDetails(orderId, userId, date, totalBillAmount, contactPerson, contactNumber, delieveryAddress, "Received", "COD");
    order.save()
        .then(result => {
            OrderItem.save(cartItems, orderId)
                .then(result => {
                    Cart.clearCart(userId)
                        .then(result => {
                            OrderDetails.getOrderByUserId(userId)
                                .then(result => {
                                    console.log(result);
                                    return response.render("order-history.ejs", {
                                        currentUser: request.session.user,
                                        orderHistory: result
                                    });

                                })
                                .catch(err => {
                                    console.log(err);
                                });

                        }).catch(err => {
                            console.log(err);
                        })
                }).catch(err => {
                    console.log(err);
                });
        })
        .catch();
}

export const history = (request, response, next) => {
    let userId = request.session.user.id;

    OrderDetails.getOrderByUserId(userId).then(result => {
        return response.render("order-history.ejs", {
            currentUser: request.session.user,
            orderHistory: result
        });
    }).catch(err => {
        console.log(err);
    })
}
export const myOrder = (request, response, next) => {
    let orderId = request.params.id;
    let userId = request.session.user;
    OrderDetails.viewOrderDetail(orderId).then(result => {
        return response.render("orders.ejs", {
            orderData: result,
            currentUser: request.session.user,
            cartItem: result.length, message: " "
        });
    }
    ).catch(err => {
        console.log(err);
    })
}