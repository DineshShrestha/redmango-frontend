import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes: ["orders"],
    endpoints: (builder)=> ({
        createOrder: builder.mutation({
            query: (orderDetails)=> ({
                url: "order",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: orderDetails,
            }),
        }),
        getAllOrders: builder.query({
            query: (userId)=> ({
                url: "order",
                params:{
                    userId: userId
                }
            }),
            providesTags: ["orders"]
        }),
        getOrderDetails: builder.query({
            query: (id)=> ({
                url: `order/${id}`
            }),
            providesTags: ["orders"]
        })
    })
});

export const {useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery} = orderApi;
export default orderApi;