import React, { useState } from 'react';

function DepositForm({ goals, onUpdateGoal }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = goals.find(g => g.id === goalId);
    const updated = { ...goal, savedAmount: goal.savedAmount + Number(amount) };

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updated.savedAmount })
    })
      .then(res => res.json())
      .then(onUpdateGoal);

    setGoalId('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
