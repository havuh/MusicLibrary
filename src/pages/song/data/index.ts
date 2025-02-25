import { ChangeEvent, RefObject } from "react";
import { ISong, ISongFilter } from "../interfaces";
import { IFormWrapperRef } from "@/interface";

export const initialValueContext = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as ISong[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<ISongFilter>>,
  methods: {},
  fetchListAll: async () => {},
};

export const song = {
  id: 0,
  title: "",
  artist: "",
  year: 0,
  genre: "",
  coverImages: [],
};
