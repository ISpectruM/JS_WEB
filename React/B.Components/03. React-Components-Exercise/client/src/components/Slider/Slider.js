import React from 'react'
import fetcher from '../../fetcher'

const IMAGE_URL = '/episodePreview/'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.getImgFromDb = this.getImgFromDb.bind(this)
    // this.getNextImage = this.getNextImage.bind(this)
    // this.getPrevImg = this.getPrevImg.bind(this)
    this.state = {
      id: null,
      url: null
    }
  }

  getImgFromDb = id => {
    fetcher.get(IMAGE_URL + id, data => { 
      this.setState(data) })
      .catch(console.log())
  }


  componentDidMount = () => {
    this.getImgFromDb(0)
  }

  getPrevImg = (id) => {
    this.getImgFromDb(id)
  }

  getNextImage = (id) => {
    this.getImgFromDb(id)
  }

  render = () => (
    <section id='slider'>
      <img className='button' src='/left.png' title='previous' alt='nav'
        onClick={() => this.getPrevImg(this.state.id - 1)} />
      <div className='image-container'>
        <img src={this.state.url} alt='episode' />
      </div>
      <img className='button' src='/right.png' title='next' alt='nav'
        onClick={() => this.getNextImage(this.state.id + 1)} />
    </section>
  )
}
