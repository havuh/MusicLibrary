import { createBrowserRouter } from "react-router-dom";
import { loginRoute } from "./login.router";
import { menuRoute } from "./menu.router";

const router = createBrowserRouter([...loginRoute, menuRoute]);

export default router;
