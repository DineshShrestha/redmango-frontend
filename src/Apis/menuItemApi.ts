import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes: ["menuItems"],
    endpoints: (builder)=> ({
        getMenuItems: builder.query({
            query: ()=> ({
                url: "menuitem"
            }),
            providesTags: ["menuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id)=> ({
                url: `menuitem/${id}`
            }),
            providesTags: ["menuItems"]
        })
    })
});

export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;