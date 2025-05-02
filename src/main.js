export function navbar() {
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
})}

navbar();

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

let setup = false;

let articleTitle = document.getElementById("articleTitle");

let articleBody = document.getElementById("articleBody");

let articleImage = document.getElementById("articleImage");

let articleButton = document.getElementById("articleButton");

let articleDate = document.getElementById("articleDate");

let errorText = document.getElementById('errorLabel');

let article;

let articles = JSON.parse(localStorage.getItem("articles")) || [];

const container = document.getElementById('articleDiv');

const container2 = document.getElementById('defaultArticles');

const form = document.getElementById('form');

defaultArticles(container2, articles);

function defaultArticles(container, articles) {
    if(setup === true) return;
    if(articles.length > 0) return;
    let article = new Article('Real Madrid wins 5-4 (agg) against Real Sociedad', 'At midnight after 114 minutes of football Antonio Rudiger headed in the winning goal to advance Real Madrid to the final!', 'img/rudiger.jpg', '2025-03-15');
    let article2 = new Article('Alexander Isak wins player of the month', 'At the end of December after scoring 8 goals and assisting 2 more goals in six Premier league appearances Alexander Isak wins player of the month.', 'img/alexisak.png', '2024-12-15');
    let article3 = new Article('Lewandowski scores brace in Barcelona 4-1 victory against Girona', 'On sunday the polishman scored in the 61st and 77th minute to help Barcelona reclaim a 3 point lead in La Liga.', 'img/lewandowski.jpg', '2025-03-20');
    let article4 = new Article('Stephen Curry scorching hot scoring 52 points with 12 threes', 'Last night against the Memphis Grizzlies, Stephen Curry put up 52 points helping Golden State Warriors get their much needed 44th win putting them in 5th place in the western conference standings. Curry also sunk 12 threes shooting from 60% from behind the arc.', 'img/stephcurry.jpg', '2025-04-10');
    articles.push(article);
    articles.push(article2);
    articles.push(article3);
    articles.push(article4);
    localStorage.setItem("articles", JSON.stringify(articles));
    articleCreator(container, articles);
    console.log('default setup done');
    setup = true;
}


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

    const dateRegex = /^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if(!dateRegex.test(articleDate.value)) {
        event.preventDefault();
        errorText.textContent = 'Enter a date in yyyy-mm-dd format';
        return;
    }

    article = new Article(articleTitle.value, articleBody.value, articleImage.value, articleDate.value);
    articles.push(article);
    console.log(articles);
    localStorage.setItem("articles", JSON.stringify(articles));
    showToast('Article Created!');
    setTimeout(() => {
        form.submit();
    }, 2000);
});

if(setup ===false) {
    articleCreator(container, articles);
}

function articleCreator(container, articles) {
if(container && Array.isArray(articles)) {
    articles.forEach((article, index) => {
        const isEven = index % 2 === 0;

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
}};

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'bg-blue-500 text-white px-4 py-2 rounded shadow-md text-center';
  toast.innerHTML = message;

  document.getElementById('toast-container').appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1500);
};