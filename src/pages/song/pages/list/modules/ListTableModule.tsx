import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListRegister } from "@/components";
import { SongListContext } from "../context";
import { songRoutes } from "@/routes";
import { ISong } from "@/pages/song/interfaces";
import { useSong } from "@/pages/song/hooks";
import { pipe } from "@/util";
import { IApiResponse } from "@/interface";
import { useAlert } from "@/hooks";

const headTable = [
  { name: "Título" },
  { name: "Artista" },
  { name: "Año" },
  { name: "Género" },
  { name: "Galería" },
  { name: "Acciones" },
];

const ListTableModule = ({ dataTable }: { dataTable: ISong[] }) => {
  const {
    count,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    fetchListAll,
  } = useContext(SongListContext);

  const { generateAlert } = useAlert();

  const handleAlert = (data: IApiResponse<ISong>) => {
    generateAlert({ ...data });
    return data;
  };

  const { deleteSong } = useSong();
  const navigate = useNavigate();
  const editRegister = (id: number) => navigate(`${songRoutes.get}/${id}`);
  const handleDeleteRegister = (id: number) => {
    deleteSong(String(id))
      .then(pipe(handleAlert))
      .finally(() => fetchListAll());
  };

  return (
    <ListRegister
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      dataRegister={dataTable}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headTable={headTable}
    >
      {dataTable?.length > 0 ? (
        dataTable
          .filter((register) => register.artist !== undefined)
          .map((row: ISong) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row?.title}</TableCell>
              <TableCell align="center">{row?.artist}</TableCell>
              <TableCell align="center">{row?.year}</TableCell>
              <TableCell align="center">{row?.genre}</TableCell>
              <TableCell align="center">
                <img
                  src={row?.coverImages?.[0] ?? ""}
                  alt={row?.title}
                  width={"auto"}
                  height={70}
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton onClick={() => editRegister(row.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Eliminar"
                  onClick={() => handleDeleteRegister(row.id)}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
      ) : (
        <TableRow>
          <TableCell
            sx={{ padding: 1 }}
            colSpan={headTable?.length + 1}
            align="center"
          >
            No hay registros
          </TableCell>
        </TableRow>
      )}
    </ListRegister>
  );
};

export default ListTableModule;
