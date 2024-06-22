import React from 'react'
import Layout from './Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddFoodForm from './components/shared-component/AddFoodForm'
import FoodTable from './components/shared-component/FoodTable'
import AddGroupItem from './components/shared-component/AddGroupItem'
import FoodVariant from './components/shared-component/FoodVariant'
import FoodAvailability from './components/shared-component/FoodAvailability'
import MenuType from './components/shared-component/MenuType'
import ManageOrder from './components/shared-component/ManageOrder'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/add-food' element={<AddFoodForm />} />
          <Route path='/food-list' element={<FoodTable />} />
          <Route path='/add-group-item' element={<AddGroupItem />} />
          <Route path='/food-variant' element={<FoodVariant />} />
          <Route path='/food-availability' element={<FoodAvailability />} />
          <Route path='/menu-type' element={<MenuType />} />
          <Route path='/manage-order' element={<ManageOrder />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}

export default App
