const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async function (req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

    //Yesterday orders count
    const yesterdayOrdersCount = yesterdayOrders.length;

    //Orders count
    const totalOrdersCount = allOrders.length;

    //Days count
    const daysCount = Object.keys(ordersMap).length;

    //Orders count per dey
    const ordersPerDay = (totalOrdersCount / daysCount).toFixed(0);

    //Percent for orders count
    //((Yesterday Orders Count / Orders Count Per Day) - 1) * 100;
    const ordersPercent = (((yesterdayOrdersCount / ordersPerDay) - 1) * 100).toFixed(2);

    //Total income
    const totalIncome = calculatePrice(allOrders);

    //IncomePerDay
    const dayIncome = totalIncome / daysCount;

    //Yesterday income
    const yesterdayIncome = calculatePrice(yesterdayOrders);

    //Income percent
    const incomePercent = (((yesterdayIncome / dayIncome) - 1) * 100).toFixed(2);

    //Compare income
    const compareIncome = (yesterdayIncome - dayIncome).toFixed(2);

    //Compare orders
    const compareOrders = (yesterdayOrdersCount - ordersPerDay).toFixed(2);


    res.status(200).json({
      income: {
        percent: Math.abs(+incomePercent),
        compare: Math.abs(+compareIncome),
        yesterday: +yesterdayIncome,
        isHigher: incomePercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareOrders),
        yesterday: +yesterdayOrdersCount,
        isHigher: ordersPercent > 0
      }
    });
  } catch (e) {
    errorHandler(res, e);
  }
}

module.exports.analytics = async function (req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
    const ordersMap = getOrdersMap(allOrders);

    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
      // label == 05.05.2018
      const income = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;;

      return {label, order, income}
    });


    res.status(200).json({average, chart});

  } catch (e) {
    errorHandler(res, e);
  }
}

function calculatePrice(orders) {

  return orders.reduce((total, order) => {
    const income = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity;
    }, 0)
    return total += income;
  }, 0);
}

function getOrdersMap(orders = []) {

  const daysOrders = {};

  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) {
      return
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });


  return daysOrders;

}
