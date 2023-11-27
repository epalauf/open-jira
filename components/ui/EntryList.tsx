import { FC, useContext, useMemo, DragEvent } from 'react';

import { List, Paper } from "@mui/material";

import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UIContext } from '@/context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDragging, endDragging } = useContext( UIContext );
    
    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries] );
    
    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        console.log({id})
        const entry = entries.find( e => e._id === id )!; // ! le dice a typescript que siempre va a venir ese valor
        // alternativa
        // if(!entry) { return }
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
    // aqui va el drop
    <div 
        onDrop={ onDropEntry } 
        onDragOver={ allowDrop }
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', backgroundColor: 'transparent', padding: '3px 12px' }}>
            <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all 0.3' }}>
                { entriesByStatus.map( entry => (
                    <EntryCard key={ entry._id } entry={ entry }  />
                ))}
            </List>            
        </Paper>
    </div>
    )
}
