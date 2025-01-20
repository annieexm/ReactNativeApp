import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses } from '../redux/slices/expenseSlice';

export default function ExpenseLogScreen() {
  const expenses = useSelector((state) => state.expenses.list);
  const dispatch = useDispatch();

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses');
      dispatch(setExpenses(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      await axios.get('http://localhost:5000/api/expenses/download');
      alert('Download started');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Expense Log</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>{`${item.date} - ${item.category}: $${item.amount}`}</Text>
        )}
      />
      <Button title="Download Log" onPress={handleDownload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});
