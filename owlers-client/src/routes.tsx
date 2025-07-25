import App from './App.tsx'
import { createBrowserRouter } from "react-router-dom";
import Home from './modules/pages/Home.tsx';
import Projects from './modules/pages/projects.tsx';
import ProjectPage from './modules/pages/project.tsx';
import SettingsPage from './modules/settings/pages/settings.tsx';
// import PreSalePage from './modules/pages/Presale.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectPage />,
      },
      {
        path: "/my-settings",
        element: <SettingsPage />,
      },
    ]
  },
  // {
  //   path: '/pre-sale',
  //   element: <PreSalePage />
  // }
]);

export default router;