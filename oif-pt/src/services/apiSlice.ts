// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Actuator, Command, Device } from './types';

// Define a service using a base URL and expected endpoints
//TODO: code-splitting
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    tagTypes: ['Devices', 'Actuators', 'Commands'],
    endpoints: (builder) => ({
        getAllDevices: builder.query<Device[], void>({
            query: () => `/devices/`,
            providesTags: (result = []) =>
                [...result.map(({ id }) => ({ type: 'Devices' as const, id })),
                { type: 'Devices', id: 'LIST' },],
            transformResponse: (response: { data: Device[] }) => {
                return response.data
            },
        }),
        getDevicebyID: builder.query<Device, string>({
            query: (id) => `/devices/${id}`,
            providesTags: (_result, _err, id) => [{ type: 'Devices', id }],
            transformResponse: (response: { data: Device }) => {
                return response.data
            },
        }),
        addNewDevice: builder.mutation<Device, Partial<Device>>({
            query: initialDevice => ({
                url: '/devices/add',
                method: 'POST',
                // Include the entire object as the body of the request
                body: initialDevice
            }),
            invalidatesTags: [{ type: 'Devices', id: 'LIST' }],
        }),
        editDevice: builder.mutation<Device, Pick<Device, 'id'>>({
            query: device => ({
                url: `devices/${device.id}/update`,
                method: 'PUT',
                body: device
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Devices', id }],
        }),
        removeDevice: builder.mutation<{ success: boolean; id: string }, any>({
            query: id => ({
                url: `devices/${id}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Devices', id }],
        }),
        getAllActuators: builder.query<Actuator[], void>({
            query: () => `/actuators/`,
            transformResponse: (response: { data: Actuator[] }) => {
                return response.data
            },
        }),
        getActuatorbyID: builder.query<Actuator, string>({
            query: (id) => `/actuators/${id}`,
            transformResponse: (response: { data: Actuator }) => {
                return response.data
            },
        }),
        addNewActuator: builder.mutation<Actuator, Partial<Actuator>>({
            query: initialActuator => ({
                url: '/actuators/add',
                method: 'POST',
                // Include the entire object as the body of the request
                body: initialActuator
            }),
            invalidatesTags: [{ type: 'Actuators', id: 'LIST' }],
        }),
        editActuator: builder.mutation<Actuator, Pick<Actuator, 'id'>>({
            query: actuator => ({
                url: `actuators/${actuator.id}/update`,
                method: 'PUT',
                body: actuator
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Actuators', id }],
        }),
        removeActuator: builder.mutation<{ success: boolean; id: string }, any>({
            query: id => ({
                url: `actuators/${id}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Actuators', id }],
        }),
        getAllCommands: builder.query<Command[], void>({
            query: () => `/commands/`,
            transformResponse: (response: { data: Command[] }) => {
                return response.data
            },
        }),
        getCommandbyID: builder.query<Command, string>({
            query: (id) => `/commands/${id}`,
            transformResponse: (response: { data: Command }) => {
                return response.data
            },
        }),
        sendCommand: builder.mutation<Command, Partial<Command>>({
            query: initialCommand => ({
                url: '/command/add',
                method: 'POST',
                // Include the entire object as the body of the request
                body: initialCommand
            }),
            invalidatesTags: [{ type: 'Commands', id: 'LIST' }],
        }),
        removeCommand: builder.mutation<{ success: boolean; id: string }, any>({
            query: id => ({
                url: `commands/${id}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Commands', id }],
        }),
        /*         getSerializationList: builder.query<string[], void>({
                    query: () => `/actuators/`,
                }),
                getProtocolList: builder.query<string[], void>({
                    query: () => `/actuators/`,
                }), */
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllDevicesQuery, useGetDevicebyIDQuery, useAddNewDeviceMutation, useEditDeviceMutation, useRemoveDeviceMutation,
    useGetAllActuatorsQuery, useGetActuatorbyIDQuery, useAddNewActuatorMutation, useEditActuatorMutation, useRemoveActuatorMutation,
    useGetAllCommandsQuery, useGetCommandbyIDQuery, useSendCommandMutation, useRemoveCommandMutation
} = apiSlice;