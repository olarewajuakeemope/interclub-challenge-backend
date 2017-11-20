const express = require('express');
const router = express.Router();

const helper = require('./helper');
const MemberModel = require('../../models/member');
const TransactionModel = require('../../models/transaction');

const FETCH_LIMIT = 2;

router.get('/aye', (req, res) => {
  res.send('aye aye');
});

router.get('/list-members', (req, res) => {
  MemberModel
        .find({})
        .sort({ number: 1 })
        .then((members) => {
          const mappedMembers = members.map((member) => {
            return {
              id: member._id,
              first_name: member.first_name,
              last_name: member.last_name,
              number: member.number,
            };
          });
          res.json(mappedMembers);
        })
        .catch((err) => {
          console.log('query failed with error', err.message);
          res.status(400).send('Error');
        });
});

// Transactions fetch route endpoint
router.get('/transactions/:id/:offset', (req, res) => {
  const { id, offset } = req.params;

  // set default db query for all requests
  let query = { member: id };

  // setup default db options for all requests
  let options = {
    sort: { date: 'desc' },
    offset: Number(offset),
  };

  // handle request query if any to add to db query
  if (req.query) {
    const { noLimit } = req.query;

    // handle request query to filter db query
    const filter = helper.filterQuery(req.query);
    query = { ...filter, ...query };

    // do not apply limit to db query options if noLimit
    options = noLimit ? options : { limit: FETCH_LIMIT, ...options };
  }

  // Perform database query
  TransactionModel.paginate(query, options).then((result) => {
    const { total, docs } = result;

    // Begin composition of response object
    const resData = { count: total };

    // Compose array of transactions for response
    const mappedTransactions = docs.map((transaction) => {
      return {
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
      };
    });

    // Add array of transactions to the response object
    resData.transactions = mappedTransactions;

    res.json(resData);
  })
  .catch((err) => {
    res.status(400).send({ message: err.message });
  });
});

module.exports = router;
