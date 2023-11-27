import { FC, ReactNode, useEffect, useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[],
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

interface EntriesProviderProps {
    children: ReactNode;
}

export const EntriesProvider:FC<EntriesProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description: description });
        dispatch({ type: '[Entries] - Add-Entry', payload: data });
    }

    const updateEntry = async ( {_id, description, status}: Entry, showSnackbar = false ) => {    
        
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: '[Entries] - Update-Entry', payload: data });

            if( showSnackbar ){
                    enqueueSnackbar('Entrad actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch ({ type: '[Entries] - Refresh Data', payload: data});        
    }

    useEffect(() => {
        refreshEntries();
    }, []);
    

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};