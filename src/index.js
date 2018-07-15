import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_lists'
import VideoDetail from './components/video_detail'

const API_KEY = "AIzaSyD0SGl2ebAoYBNLD1KS97f5i7f3eyctMuI";


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {videos:[],selectedVideo:null,error:'',term:'teddy afro ayantu'};
		this.searchVideos({term:'teddy afro ayantu'});
		
	}
	searchVideos({term}){
		
		YTSearch({key:API_KEY,term},(videos,error)=>{
			console.log(term);
			if(error){
				this.setState({videos:[],selectedVideo:null,error,term});
			}else{
				let e = (videos.length==0)?'No videos from the search result':'';
				this.setState({videos:videos,
						  selectedVideo:videos[0],error:e,term
						  });
			console.log(videos);
			}
		});
	}
  render(){
	  const searchVideos = _.debounce(term=>this.searchVideos(term),3000);
	  if(this.state.error){
		  return(<div>
					 <SearchBar term={this.state.term} termChanged={searchVideos} />
				 	<em> {this.state.error} </em>
				</div>);
	  }
    return(
    <div> <SearchBar term={this.state.term} termChanged={searchVideos} />
		<VideoDetail video={this.state.selectedVideo} term={this.state.term}/>
		<VideoList onVideoSelect={selectedVideo=>this.setState({selectedVideo})} videos={this.state.videos} />
     </div>
  )
}}

ReactDOM.render(<App />,document.querySelector(".container"))
