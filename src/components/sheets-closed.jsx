import { Card, CardActionArea, CardMedia, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import rickymorty from '../img/rickymorty.png'
import OpenedSheets from './sheets-opened';

export default function ClosedSheets() {

    let sheets = [false, false, false, false];
    const [visible, setVisible] = useState(sheets);

    const handleClick = (e) => {
        console.log(e.currentTarget.value);
        let isVisible = [false, false, false, false]
        const value = Number(e.currentTarget.value);
        isVisible[value] = true;
        setVisible(isVisible);
    }

    return (
        <>
            {(() => {
                if (visible.find(e => e === true)) {
                    return (
                        <OpenedSheets />
                    )
                } else {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', alignItems: 'center', height: '80vh' }}>
                            {sheets.map((e, i) => {
                                return <>
                                    <Card key={'c' + i} sx={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <CardActionArea value={i} onClick={handleClick}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}> Abre aquí</Typography>
                                            <CardMedia component='img' image={rickymorty}>
                                            </CardMedia>
                                            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center' }}>
                                                0:59
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </>
                            })}
                        </Box>
                    )
                }
            })()
            }

        </>
    )
}
