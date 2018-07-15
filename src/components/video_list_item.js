import React, {Component} from 'react';
import VideoDetail from './video_detail'
//{this.props.video.kind}
class VideoListItem extends Component{
	constructor(props){
		super(props);
		//console.log(imageUrl);
		}
	getImageUrl(){
		let imageUrl = this.props.video.snippet.thumbnails.default.url;
		return imageUrl;
	}
	render(){
		return (<li onClick={()=>this.props.onVideoSelct(this.props.video)} className="list-group-item"> 
			<div className="video-list media">
				<div className="media-left">
					<img className="media-object" src={this.getImageUrl()} />
				</div>
			<div className="media-body">
				<div className="media-heading">
					{this.props.video.snippet.title}
				</div>
			</div>
		  </div>
		</li>);
	};
}

export default VideoListItem;