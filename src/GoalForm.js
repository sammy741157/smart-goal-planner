import React, { useState } from 'react';

function AddGoalForm({ onAddGoal }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      ...form,
      targetAmount: Number(form.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(onAddGoal);

    setForm({ name: '', targetAmount: '', category: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Goal</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Goal Name" required />
      <input name="targetAmount" value={form.targetAmount} onChange={handleChange} placeholder="Target Amount" type="number" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="deadline" value={form.deadline} onChange={handleChange} type="date" required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;
