import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Participants from "./Participants"; 

const Body = () => {
    const appRouter = createBrowserRouter([
        { path: "/",
          element: <Login />
        },
        { path: "/browse",
          element: <Browse />
        },
        { path: "/participants", 
          element: <Participants />
        },
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default Body;