const express = require('express');
const router = express.Router();

const MemberModel = require('../../models/member');
const TransactionModel = require('../../models/transaction');

router.get('/aye', (req, res) => {
    res.send('aye aye');
});

router.get('/list-members', (req, res) => {
    MemberModel
        .find({})
        .sort({number: 1})
        .then(members => {
            const mappedMembers = members.map(member => {
                return { 
                    id: member._id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    number: member.number
                };
            });
            res.json(mappedMembers);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

router.get('/transactions/:id', (req, res) => {
  TransactionModel
    .find({ 'member': req.params.id })
    .then((transactions) => {
      const mappedTransactions = transactions.map((transaction) => {
        return {
          id: transaction._id,
          amount: transaction.amount,
          type: transaction.type,
          date: transaction.date,
        };
      });
      res.json(mappedTransactions);
    })
    .catch(err => {
        res.status(400).send('Error');
    });
});

module.exports = router;
