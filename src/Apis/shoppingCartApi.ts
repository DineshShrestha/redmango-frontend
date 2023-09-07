import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
    reducerPath:"shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes: ["ShoppingCart"],
    endpoints: (builder)=> ({
        getShoppingCart: builder.query({
            query: ()=> ({
                url: `shoppingcart`,
                params:{
                }
            }),
            providesTags: ["ShoppingCart"],
        }),
        updateShoppingCart:builder.mutation({
            query: ({menuItemId, updateQuantityBy, })=> ({
                url: "shoppingcart",
                method: "POST",
                params: {
                    menuItemId,
                    updateQuantityBy,
                    
                },
            }),
            invalidatesTags: ["ShoppingCart"]
        })
    })
});

export const {useGetShoppingCartQuery, useUpdateShoppingCartMutation} = shoppingCartApi;
export default shoppingCartApi;