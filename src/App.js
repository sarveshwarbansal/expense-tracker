import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

let DUMMY_EXPENSE = [
  {
    id: "e1",
    title: "school fee",
    amount: 250,
    date: new Date(2021, 5, 12),
  },
  {
    id: "e2",
    title: "books",
    amount: 230,
    date: new Date(2021, 2, 22),
  },
  {
    id: "e3",
    title: "house rent",
    amount: 700,
    date: new Date(2021, 4, 2),
  },
  {
    id: "e4",
    title: "food",
    amount: 540,
    date: new Date(2021, 5, 5),
  },
];
const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);
  function fetchData() {
    fetch("https://techgun.website/sample/api/read.php")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setExpenses(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addExpenseHandler = (expense) => {
    fetch("https://techgun.website/sample/api/create.php", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => {
      fetchData();
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
