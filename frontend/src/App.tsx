import React from 'react'
import Layout from './Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddFoodForm from './components/shared-component/AddFoodForm'
import FoodTable from './components/shared-component/FoodTable'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/add-food' element={<AddFoodForm />} />
          <Route path='/food-list' element={<FoodTable />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}

export default App
