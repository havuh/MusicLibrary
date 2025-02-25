import {
  createContext,
  useState,
  ChangeEvent,
  useEffect,
  PropsWithChildren,
  useRef,
  FC,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { ISong, ISongFilter } from "@/pages/song/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useSong } from "@/pages/song/hooks";
import { initialValueContext } from "@/pages/song/data";

export const SongListContext = createContext(initialValueContext);

const SongListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<ISong[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { controller, songs, isLoadingList } = useSong();
  const ref = useRef<IFormWrapperRef<ISongFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const fetchListAll = async (
    filters: Partial<ISongFilter> = {},
    signal?: AbortSignal,
  ) => {
    const filterValues = methods.getValues();
    const params = { page, rowsPerPage, ...filterValues, ...filters };

    const { data } = await songs(params, signal);
    setDataTable(data);
    setCount(data.length);
  };

  const onSubmitSuccess = async (data: ISongFilter) => fetchListAll(data);

  const handleSubmit = () => ref.current!.submit(onSubmitSuccess);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(target.value, 10);
    setRowsPerPage(pageSize);
    setPage(0);
  };

  useEffect(() => {
    fetchListAll({}, controller.signal);

    return () => {
      controller.abort();
    };
  }, [page, rowsPerPage]);

  const values = useMemo(
    () => ({
      cleanFields,
      count,
      dataTable,
      handleChangePage,
      handleChangeRowsPerPage,
      handleSubmit,
      isLoadingList,
      page,
      ref,
      rowsPerPage,
      methods,
      fetchListAll,
    }),
    [count, dataTable, isLoadingList, page, rowsPerPage, methods],
  );
  

  return (
    <SongListContext.Provider value={values}>
      {children}
    </SongListContext.Provider>
  );
};

export default SongListProvider;
