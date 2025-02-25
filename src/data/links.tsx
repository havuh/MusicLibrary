import { LibraryMusic } from '@mui/icons-material';
import { songRoutes } from '../routes/paths'

export const links = [
  {
    adminOnly: true,
    text: "Mi música",
    icon: <LibraryMusic />,
    path: songRoutes.get,
  }
];
