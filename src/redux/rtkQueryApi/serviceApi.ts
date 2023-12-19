// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import { Service } from "@/utils/interface";

// export const serviceApi = createApi({
//   reducerPath: "serviceApi",
//   tagTypes: [],
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/services" }),
//   endpoints: (builder) => ({
//     services: builder.query<Service[], void>({
//       query: () => "/",
//       transformResponse: (response: any, meta, arg) => response.data.services,
//     }),

//     service: builder.query<Service, string>({
//       query: (id: string) => `/${id}`,
//       transformResponse: (response: any, meta, arg) => response.data.service,
//     }),

//     createService: builder.query<Service, Service>({
//       query: (body: Service) => ({
//         url: "/",
//         method: "POST",
//         body: body,
//       }),
//       transformResponse: (response: any, meta, arg) => response.data.service,
//     }),

//     updateService: builder.query<Service, Service>({
//       query: ({ _id, ...data }: Service) => ({
//         url: `/${_id}`,
//         method: "PUT",
//         body: data,
//       }),
//       transformResponse: (response: any, meta, arg) => response.data.service,
//     }),

//     deleteService: builder.query<Service, string>({
//       query: (id: string) => ({
//         url: `/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useServicesQuery,
//   useServiceQuery,
//   useCreateServiceQuery,
//   useDeleteServiceQuery,
//   useUpdateServiceQuery,
// } = serviceApi;
