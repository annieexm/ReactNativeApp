import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/slices/expenseSlice';

export default function ExpenseInputScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Leisure');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();

  const handleAddExpense = async () => {
    try {
      const newExpense = { amount, category, date };
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
      dispatch(addExpense(response.data));
      setAmount('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Log Expense</Text>
      <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Leisure" value="Leisure" />
        <Picker.Item label="Beauty" value="Beauty" />
        <Picker.Item label="Groceries" value="Groceries" />
        <Picker.Item label="Cafe" value="Cafe" />
        <Picker.Item label="Bills & Rent" value="Bills & Rent" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Custom" value="Custom" />
      </Picker>
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, width: '100%' },
});
