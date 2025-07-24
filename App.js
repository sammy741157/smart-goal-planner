import React, { useEffect, useState } from 'react';
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then(res => res.json())
      .then(setGoals);
  }, []);

  // Add goal
  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  // Update goal
  const handleUpdateGoal = (updatedGoal) => {
    const updatedGoals = goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  };

  // Delete goal
  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm onAddGoal={handleAddGoal} />
      <DepositForm goals={goals} onUpdateGoal={handleUpdateGoal} />
      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
}

export default App;
