import { RouteObject } from "react-router-dom";
import { authenticationRouter } from "@/util";
import { songRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { SongCreateUpdatePage } = await import(
    "@/pages/song/pages/createUpdate"
  );
  return { Component: SongCreateUpdatePage };
};

export const songRoute: RouteObject[] = [
  {
    path: songRoutes.get,
    async lazy() {
      const [{ SongListProvider }, { SongListPage }] = await Promise.all([
        import(
          "@/pages/song/pages/list/context"
        ),
        import(
          "@/pages/song/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <SongListProvider>
            <SongListPage />
          </SongListProvider>
        ),
      };
    },
    loader: () => authenticationRouter(true),
  },
  {
    path: songRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: () => authenticationRouter(true),
  },
  {
    path: songRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: () => authenticationRouter(true),
  },
];
