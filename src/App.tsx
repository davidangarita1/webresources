import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/public/PublicLayout";
import PrivateLayout from "./layouts/private/PrivateLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Resources from "./pages/Resources/Resources";
import NotFound from "./pages/NotFound/NotFound";

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<PrivateLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
