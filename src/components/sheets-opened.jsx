import { Card, CardActionArea, CardMedia, Typography, CardContent, Stack, Tooltip, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import rickymorty from '../img/rickymorty.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

export default function OpenedSheets() {

    let sheets = [false, false, false, false, false];
    const [visible, setVisible] = useState(sheets);

    const handleClick = (e) => {
        console.log(e.currentTarget.value);
        let isVisible = [false, false, false, false]
        const value = Number(e.currentTarget.value);
        isVisible[value] = true;
        setVisible(isVisible);
    }

    return (
        <Box sx={{ display: 'flex', alignContent: 'center', justifyItems: 'center', height: '70%', margin: { xs: '20px' } }} >
            {console.log('en el componente', visible)}
            < Paper elevation={3} sx={{ display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ECFBA7', padding: { xs: '5%', xl: '9%' }, paddingLeft: { xl: '13%' }, paddingRight: { xl: '13%' } }}>
                {sheets.map((e, i) => {
                    return (
                        <Card key={`${i}c`} sx={{ display: { xs: 'block', sm: 'block', height: '400px' }, margin: '10px' }}>
                            <CardMedia
                                component="img"
                                height="300px"
                                image={`https://rickandmortyapi.com/api/character/avatar/15.jpeg`}
                                alt={'a'}
                                sx={{
                                    height: '250px',
                                    align: 'center',
                                    margin: '0px',
                                    padding: '0px',
                                    border: '0px',
                                    objectFit: 'contain',
                                }}
                            />
                            <CardContent>
                                <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>
                                        Pepito Pérez
                                    </Typography>
                                    <Tooltip title='add to album'>
                                        <AddCircleIcon fontSize='large' />
                                    </Tooltip>

                                    {/* <RemoveCircleIcon /> */}
                                </Stack>
                            </CardContent>
                        </Card>
                    )
                })}
                <CancelPresentationIcon fontSize='large' />
            </Paper>
        </Box >
    )
}
