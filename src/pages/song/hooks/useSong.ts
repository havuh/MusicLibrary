import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { songRoutes, getApi, postApi, putApi } from "@/services";
import { ISongFilter, ISong, ISongCreateUpdate } from "../interfaces";
import { generateQuery } from "@/util";
import { song } from "../data";
import { deleteApi } from "@/services/api";

export const useSong = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const controller = new AbortController();

  const songs = async (
    params: Partial<ISongFilter>,
    signal?: AbortSignal,
  ): Promise<IApiResponse<ISong[]>> => {
    setIsLoadingList(true);
    const url = generateQuery(params, songRoutes);

    try {
      const response: AxiosResponse<IApiResponse<ISong[]>> = await getApi(url, {
        signal,
      });
      const { data, message, status } = response.data;

      return { data, message, status };
    } catch (_) {
      return { message: "Ocurrio un error.", data: [song], status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  };

  const songById = async (id: string): Promise<IApiResponse<ISong>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<ISong> = await getApi(
        `${songRoutes}/${id}`,
      );

      return { message: "Ok", data: response.data, status: 200 };
    } catch (_) {
      return { message: "Ocurrio un error.", data: song, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const createSong = async (
    params: ISongCreateUpdate,
  ): Promise<IApiResponse<ISong>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<ISong>> = await postApi(
        songRoutes,
        params,
      );
      const { data, message, status } = response.data;

      return { data, message, status };
    } catch (_) {
      return { message: "Ocurrio un error.", data: song, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateSong = async (
    id: string,
    params: ISongCreateUpdate,
  ): Promise<IApiResponse<ISong>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<ISong>> = await putApi(
        `${songRoutes}/${id}`,
        params,
      );
      const { data, message, status } = response.data;

      return { data, message, status };
    } catch (_) {
      return { message: "Ocurrio un error.", data: song, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const deleteSong = async (id: string): Promise<IApiResponse<ISong>> => {
    setIsLoadingDelete(true);

    try {
      const response: AxiosResponse<IApiResponse<ISong>> = await deleteApi(
        `${songRoutes}/${id}`,
      );
      const { data, message, status } = response.data;

      return { data, message, status };
    } catch (_) {
      return { message: "Ocurrio un error.", data: song, status: 500 };
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return {
    songById,
    songs,
    createSong,
    controller,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    isLoadingDelete,
    updateSong,
    deleteSong,
  };
};
