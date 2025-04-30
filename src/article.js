document.addEventListener("DOMContentLoaded", ()=> {
    const sidebar = document.getElementById("sidebar")
    const button = document.getElementById("button")
    const button2 = document.getElementById("button2")

    button.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    button2.addEventListener("click", () => {
        sidebar2.classList.toggle("open");
    });
});

let articles = JSON.parse(localStorage.getItem("articles")) || [];

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

let mainArticle = articles[articleId];
console.log(mainArticle)

document.getElementById('temporaryImage').style.backgroundImage = `url('${mainArticle.image}')`;
document.getElementById('temporaryTitle').textContent = mainArticle.title;
document.getElementById('temporaryBody').textContent = mainArticle.body;
document.getElementById('temporaryDate').textContent = mainArticle.date;

const likeButton = document.getElementById('likeButton');

const dislikeButton = document.getElementById('dislikeButton');

const submitButton = document.getElementById('submitButton');

const commentSection = document.getElementById('commentSection');

const commentsWrapper = document.getElementById('comments');

const deleteButton = document.getElementById('deleteButton');

let ArticleComments = mainArticle.comments;

ArticleComments.forEach(comment => {
    let text = document.createElement('p');
    text.textContent = comment;
    commentsWrapper.append(text);
});

likeButton.textContent = mainArticle.likes + ' Likes';

dislikeButton.textContent = mainArticle.dislikes + ' Dislikes';

likeButton.addEventListener('click', function(event) {
    mainArticle.likes += 1;
    likeButton.textContent = mainArticle.likes + ' Likes';
    localStorage.setItem("articles", JSON.stringify(articles));
});

dislikeButton.addEventListener('click', function(event) {
    mainArticle.dislikes += 1;
    dislikeButton.textContent = mainArticle.dislikes + ' Dislikes';
    localStorage.setItem("articles", JSON.stringify(articles));
});

submitButton.addEventListener('click', function(event) {
    if(commentSection.value === '' || commentSection.value === undefined) {
        console.log('please enter a comment');
        return;
    }

    mainArticle.comments.push(commentSection.value);
    localStorage.setItem("articles", JSON.stringify(articles));
    location.reload();
});

deleteButton.addEventListener('click', function(event) {
    articles.splice(articleId, 1);
    localStorage.setItem('articles', JSON.stringify(articles));
    alert('article deleted');
    window.location.href = 'index.html';
})

localStorage.setItem("articles", JSON.stringify(articles));