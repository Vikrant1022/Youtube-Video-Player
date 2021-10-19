import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import youtube from './api/youtube'
// import VideoDetail from './components/VideoDetail'
import {SearchBar,VideoDetail,VideoList} from './components'

class App extends Component {

    state = {
        video : [],
        selectedVideo : null
    }
    handleSubmit = async (searchTerm)=>{
        const response = await youtube.get('search', {params:{
            part:'snippet',
            maxResults:5,
            key: process.env.REACT_APP_API_KEY,
            q:searchTerm
        }
    });
        this.setState({video:response.data.items,selectedVideo:response.data.items[0]})
    }

    componentDidMount(){
        this.handleSubmit('Sadhguru kailas yatra')
    }

    onVideoSelect = (video)=>{
        this.setState({selectedVideo:video});
    }


    render() {
       // console.log(process.env.REACT_APP_API_KEY)
        const {selectedVideo,video} = this.state
        return (
            <Grid justifyContent="center" container spacing={5} >
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>

                        </Grid>
                        <Grid item xs = {8}>
                            <VideoDetail video={selectedVideo}/>
                         </Grid>
                        <Grid item xs = {4}>
                            <VideoList videos = {video} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default App;
