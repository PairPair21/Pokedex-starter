import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from '@/pages/home'
import DetailPage from '@/pages/detail'
import { useState } from 'react';

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/detail/:name",
    element: <DetailPage />,
  },
  ]);
  
  return (
    <div className="bg-[url('/project-resources/list_bg.jpg')] min-h-[100vh]">
      <RouterProvider router={router} />;
    </div>
  )
}

export default App
