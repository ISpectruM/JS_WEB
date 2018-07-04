import React from 'react'
import { Link } from 'react-router-dom'

export default class Article extends React.Component {

  generateArticles = () => {

    return this.props.articles.map((article, index) => {
      console.log(Date.now());
      console.log(new Date(article._kmd.lmt));
      console.log();

      let timeElapsed = Math.ceil(((((Date.now() - new Date(article._kmd.lmt)) / 1000) / 60) / 60) / 24)
      console.log(timeElapsed)

      return (
        <article key={article._id} className='post'>
          <div className='col rank'>
            <span>{index + 1}</span>
          </div>
          <div className='col thumbnail'>
            <a href={article.url}>
              <img src={article.imageUrl} alt='img' />
            </a>
          </div>
          <div className='post-content'>
            <div className='title'>
              <a href={article.url}>{article.title}</a>
            </div>
            <div className='details'>
              <div className='info'>submitted {timeElapsed} day ago by {article.author}</div>
              <div className='controls'>
                <ul>
                  <li className='action'>
                    <Link className='commentsLink' to='/comments'>comments</Link>
                  </li>
                  <li className='action'>
                    <Link className='editLink' to='/edit'>edit</Link>
                  </li>
                  <li className='action'>
                    <Link className='deleteLink' to='/delete'>delete</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      )
    })
  }

  render() {
    return (
      <div className='posts'>
        {this.generateArticles()}
      </div>
    )
  }
}
