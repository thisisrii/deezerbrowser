import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: 20,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridListTile: {
        height: '180px !important',
        width: '30% !important',
    },
    title: {
        color: '#ffffff',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
    },
}));

export default function AlbumGrid(props) {
    const classes = useStyles();

    const handleAlbumClick = (value) => {
        props.handleAlbumClick(value);
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {props.albums.map(tile => (
                    <GridListTile key={tile.id} className={classes.gridListTile}>
                        <img src={tile.cover_big} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={

                                <IconButton id={tile.id} aria-label={`view tracks ${tile.title}`} onClick={() => { handleAlbumClick(tile.id) }}>
                                    <FilterListIcon className={classes.title} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}