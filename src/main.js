document.addEventListener("DOMContentLoaded", ()=> {
    const sidebar = document.getElementById("sidebar")
    const button = document.getElementById("button")
    const button2 = document.getElementById("button2")

    button.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    button2.addEventListener("click", () => {
        sidebar2.classList.toggle("open");
    })
})

class Article {
  constructor(title, body, image, date) {
    this.title = title;
    this.body = body;
    this.image = image;
    this.likes = 0;
    this.dislikes = 0;
    this.comments = [];
    this.date = date;
  }
}

let articleTitle = document.getElementById("articleTitle");

let articleBody = document.getElementById("articleBody");

let articleImage = document.getElementById("articleImage");

let articleButton = document.getElementById("articleButton");

let articleDate = document.getElementById("articleDate");

let errorText = document.getElementById('errorLabel');

let article;

let articles = JSON.parse(localStorage.getItem("articles")) || [];


articleButton.addEventListener("click", function(event) {
    if(articleTitle.value === '' || articleTitle === undefined) {
        event.preventDefault();
        errorText.textContent = 'Enter a title!';
        return;
    }

    if(articleBody.value === '' || articleBody.value === undefined) {
        event.preventDefault();
        errorText.textContent = 'Enter a body!';
        return;
    }

    if(articleImage.value === '' || articleImage.value === undefined) {
        event.preventDefault();
        errorText.textContent = 'Enter an image url!';
        return;
    }

    if(articleDate.value === '' || articleDate.value === undefined) {
        event.preventDefault();
        errorText.textContent = 'Enter a date!';
        return;
    }

    function validDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    if(!validDate(articleDate.value)) {
        event.preventDefault();
        errorText.textContent = 'Enter a date in yyyy-mm-dd format';
        return;
    }

    article = new Article(articleTitle.value, articleBody.value, articleImage.value, articleDate.value);
    articles.push(article);
    console.log(articles);
    localStorage.setItem("articles", JSON.stringify(articles));
    alert("Article Created!");
});

const container = document.getElementById('articleDiv');

if(container && Array.isArray(articles)) {
    articles.forEach((article, index) => {
        const isEven = index % 2 === 1;

        const articleWrapper = document.createElement('div');
        articleWrapper.className = `flex h-[40vh] flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`;

        const articleLink = document.createElement('a');
        articleLink.href = `article.html?id=${index}`;;

        articleLink.style.display = 'block';
        articleLink.style.textDecoration = 'none';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'h-full w-full lg:w-2/3 bg-cover';
        imageDiv.style.backgroundImage = `url('${article.image}')`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'h-full w-full lg:w-1/3 bg-cover bg-white p-5';

        const title = document.createElement('h2');
        title.className = 'text-lg font-bold';
        title.textContent = article.title;

        const dateArticle = document.createElement('h3');
        dateArticle.className = 'text-sm italic';
        dateArticle.textContent = article.date;

        let previewBody = article.body.slice(0,60) + '...';

        const body = document.createElement('p');
        body.textContent = previewBody;

        contentDiv.appendChild(title);
        contentDiv.appendChild(dateArticle);
        contentDiv.appendChild(body);
        
        articleWrapper.appendChild(imageDiv);
        articleWrapper.appendChild(contentDiv);

        container.appendChild(articleWrapper);

        articleLink.appendChild(articleWrapper);

        container.appendChild(articleLink);
    });
};