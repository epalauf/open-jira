import React, { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {
    
    const { addNewEntry } = useContext(EntriesContext);
    const { updateIsAddingEntry, isAddingEntry } = useContext( UIContext );

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);        
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        addNewEntry(inputValue);
        updateIsAddingEntry(false);
        setInputValue('');
        setTouched(false);
    }

    const onCancel = () => {
        updateIsAddingEntry(false);
        setTouched(false);
    }

    return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

        { isAddingEntry ? (
            <>
                <TextField 
                    fullWidth
                    sx={{
                        marginTop: 2,
                        marginBottom: 1
                    }}
                    autoFocus
                    multiline
                    label='Nueva entrada'
                    helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                    error={ inputValue.length <= 0 && touched }
                    value={ inputValue }
                    onChange={onTextFieldChanges}
                    onBlur={ () => setTouched(true) }
                />
                <Box display='flex' justifyContent='space-between' >
                    <Button
                        variant='text'
                        onClick={ onCancel }
                    >Cancelar</Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        endIcon={ <SaveOutlinedIcon /> }
                        onClick={ onSave }
                        
                    >Guardar</Button>
                </Box>
            </>

        ) : (
            <Button 
                startIcon={ <AddIcon />} 
                variant='outlined'
                fullWidth
                onClick={ () => updateIsAddingEntry(true) }
            >
                Agregar tarea
            </Button>
        )}
    </Box>
  )
}
