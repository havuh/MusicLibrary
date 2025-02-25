import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  ConfirmationModal,
  FormController,
  FormWrapper,
  Loading,
} from "@/components";
import { songRoutes } from "@/routes";
import { IApiResponse, IFormWrapperRef } from "@/interface";
import { useAlert } from "@/hooks";
import { pipe, updateFormValues } from "@/util";
import { useSong } from "@/pages/song/hooks";
import { ISongCreateUpdate } from "@/pages/song/interfaces";
import { schemaCreateUpdate } from "@/pages/song/schemas";

const SongCreateUpdatePage = () => {
  const { createSong, isLoadingCreate, isLoadingUpdate, updateSong, songById } =
    useSong();
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<IFormWrapperRef<ISongCreateUpdate>>(null);
  const form = useForm();
  const { setValue } = form;
  const schema = schemaCreateUpdate();

  const handleAlert = (data: IApiResponse<ISongCreateUpdate>) => {
    generateAlert({ ...data });
    return data;
  };

  const onSubmitSuccess = async (dataSend: ISongCreateUpdate) => {
    if (id)
      await updateSong(id, dataSend)
        .then(pipe(handleAlert))
        .then(() => redirect(songRoutes.get));
    else await createSong(dataSend).then(pipe(handleAlert));
    setOpen(false);
  };

  const confirmSave = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = () =>
    ref.current!.submit(onSubmitSuccess, handleCloseModal);

  const getDataById = async (id: string) => {
    const response = await songById(id);
    updateFormValues(response.data, setValue);
  };

  useEffect(() => {
    if (id) getDataById(id);
  }, []);

  return (
    <>
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormWrapper methods={form} ref={ref}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.title} label="Titulo" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.artist} label="Artista" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.year} label="Año" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.genre} label="Género" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.coverImages} label="Covers" />
            </Grid>
          </Grid>
        </FormWrapper>
      </Paper>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        justifyContent="flex-end"
        mt={2}
      >
        <Button
          onClick={confirmSave}
          variant="contained"
          sx={{ order: { xs: 1, sm: 2 } }}
        >
          {id ? "Actualizar" : "Crear"}
        </Button>
        <Button
          variant="outlined"
          sx={{ order: { xs: 2, sm: 1 } }}
          onClick={() => navigate(songRoutes.get)}
          startIcon={<ArrowBackIosIcon fontSize="small" />}
        >
          Regresar
        </Button>
      </Stack>
      <ConfirmationModal
        open={open}
        handleClose={handleCloseModal}
        actionButtonConfirm={handleSubmit}
        isLoading={isLoadingCreate}
      />
      <Alert open={openSnackbar} onClose={handleClose} type={alertType}>
        {messageAlert}
      </Alert>
      {isLoadingUpdate && <Loading />}
    </>
  );
};

export default SongCreateUpdatePage;
