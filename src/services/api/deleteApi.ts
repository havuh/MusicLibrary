import { getCookies, api } from "@/services";

const deleteApi = async (url: string) => {
  const token = getCookies("token");
  const response = await api.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default deleteApi;
