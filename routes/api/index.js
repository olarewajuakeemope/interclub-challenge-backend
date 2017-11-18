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

router.get('/transactions/:id/:offset', (req, res) => {
  const { id, offset } = req.params;
  let query = { member: id };
  if (req.query) {
    const filter = helper.filterQuery(req.query);
    query = { ...filter, ...query };
  }
  const options = {
    sort: { date: 'desc' },
    offset: Number(offset),
    limit: FETCH_LIMIT,
  };

  TransactionModel.paginate(query, options).then((result) => {
    const { total, docs } = result;
    const resData = { count: total };
    const mappedTransactions = docs.map((transaction) => {
      return {
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
      };
    });
    resData.transactions = mappedTransactions;
    res.json(resData);
  })
  .catch((err) => {
    console.log('query failed with error', err.message);
    res.status(400).send('Error');
  });
});

module.exports = router;
