const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, downloadExpenses } = require('../controllers/expenseController');

router.post('/', addExpense);
router.get('/', getExpenses);
router.get('/download', downloadExpenses);

module.exports = router;
