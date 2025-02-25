import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
  title: {
    name: "title",
    validations: {
      required: "Este campo es requerido",
    },
  },
  artist: {
    name: "artist",
    validations: {
      required: "Este campo es requerido",
    },
  },
  year: {
    name: "year",
    validations: {
      required: "Este campo es requerido",
    },
  },
  genre: {
    name: "genre",
    validations: {
      required: "Este campo es requerido",
    },
  },
  coverImages: {
    name: "coverImages",
    validations: {
      required: "Este campo es requerido",
    },
  },
});
