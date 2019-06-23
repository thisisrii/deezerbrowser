import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IsNullOrUndefined, getDurationInMinutes } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

export default function TrackList(props) {
    const classes = useStyles();
    const tracks = props.album.tracks;
    console.log('tracks', tracks);
    if (IsNullOrUndefined(tracks)) {
        return <div></div>;
    } else {
        const releasedDate = props.album.release_date.split("-", 1);

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Artist</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Released</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.data.map((track, index) => (
                            <TableRow key={track.id}>
                                <TableCell component="th" scope="row">
                                    {index += 1}
                                </TableCell>
                                <TableCell align="left">{track.title}</TableCell>
                                <TableCell align="left">{track.artist.name}</TableCell>
                                <TableCell align="right">{getDurationInMinutes(track.duration)}</TableCell>
                                <TableCell align="right">{releasedDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}