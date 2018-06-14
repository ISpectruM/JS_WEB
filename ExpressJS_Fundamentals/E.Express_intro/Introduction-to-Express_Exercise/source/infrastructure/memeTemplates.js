module.exports = {
  viewAll: (id, url) => `
        <div class="meme">
            <a href="/memes/getDetails?id=${id}">
                <img class="memePoster" src="${url}"/> 
            </a>         
        </div>`,
  genreOption: (id, title) =>
    `<option value="${id}">${title}</option>`,
  details: (url, title, description, id) => `
        <div class="content">
            <img src="${url}" alt=""/>
            <h3>Title  ${title}</h3>
            <p> ${description}</p>
            <button>
                <a href="${url}" download="${title}.jpg" >Download Meme</a>
            </button>
            <button>
                <a href="/memes/deleteMeme/${id}" id="delete" data-meme-id=${id}>Delete</a>
            </button>
        </div>`,
  detailsLink: (id, url) => `
        <div class="meme">
            <a href="/memes/getDetails/${id}">
            <img class="memePoster" src="${url}"/>          
        </div>`,
  deleteMemes: (meme, genre) => `
  <form action="/memes/deleteMeme/${meme.id}" enctype=multipart/form-data method="POST">

        <label for="memeTitle">Title</label>
        <input type="text" id="memeTitle" name="memeTitle" value="${meme.title}" disabled>

        <select name='genreSelect' id="genreSelect" disabled>
            <option value="${genre._id}">${genre.title}</option>
        </select>


        <label for="memePoster">Poster URL</label>
        <img class="memePoster" src="${meme.memeSrc}"/>          

        <input type="checkbox" name='status' id='status' value="${meme.privacy}" disabled {{checked}}> public

        <label for="memeDescription">Movie description</label>
        <textarea id="memeDescription" name="memeDescription" rows="10" cols="10" disabled>
        ${meme.description}
        </textarea>

        <input type="submit" value="Delete">
        </form>
        `
}
