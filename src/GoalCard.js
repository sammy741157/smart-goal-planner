import React from 'react';

function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isComplete = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysLeft < 0 && !isComplete;

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Remaining: ${remaining}</p>
      <div style={{ background: '#eee', height: '20px', width: '100%' }}>
        <div style={{
          width: `${progress}%`,
          background: progress >= 100 ? 'green' : 'blue',
          height: '100%'
        }} />
      </div>
      <p>Deadline: {goal.deadline} ({daysLeft} days left)</p>
      {daysLeft < 30 && !isComplete && <p style={{ color: 'orange' }}>⚠ Deadline approaching!</p>}
      {isOverdue && <p style={{ color: 'red' }}>❌ Overdue!</p>}
      {isComplete && <p style={{ color: 'green' }}>✅ Completed!</p>}

      <button onClick={() => {
        fetch(`http://localhost:3001/goals/${goal.id}`, { method: 'DELETE' })
          .then(() => onDeleteGoal(goal.id));
      }}>Delete</button>
    </div>
  );
}

export default GoalCard;
