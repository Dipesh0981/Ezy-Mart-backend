db.orders.aggregate([
    { $match: { status: "Completed" } }, 
    { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 }
  ]);
  