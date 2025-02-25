import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Loading } from "@/components";
import { songRoutes } from "@/routes";
import { ListTableModule } from "../modules";
import { SongListContext } from "../context";
import { IPayloadToken } from "@/interface";
import { useProtectedRouter } from "@/hooks";

const SongListPage = () => {
  const { dataTable, isLoadingList } = useContext(SongListContext);
  const { isAdmin } = useLoaderData() as IPayloadToken;
  useProtectedRouter(isAdmin);
  const navigate = useNavigate();

  const addRegister = () => navigate(songRoutes.create);

  return (
    <>
      <Stack
        display="flex"
        direction="row"
        justifyContent="flex-end"
        gap={2}
        mb={2}
      >
        <Button variant="contained" endIcon={<AddIcon />} onClick={addRegister}>
          Agregar
        </Button>
      </Stack>
      <ListTableModule dataTable={dataTable} />
      {isLoadingList && <Loading />}
    </>
  );
};

export default SongListPage;
