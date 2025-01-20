const Expense = require('../models/Expense');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error adding expense' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching expenses' });
  }
};

exports.downloadExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const csvWriter = createCsvWriter({
      path: 'expenses.csv',
      header: [
        { id: 'date', title: 'DATE' },
        { id: 'category', title: 'CATEGORY' },
        { id: 'amount', title: 'AMOUNT' },
      ],
    });
    await csvWriter.writeRecords(expenses);
    res.download('expenses.csv');
  } catch (error) {
    res.status(400).json({ message: 'Error downloading expenses' });
  }
};
