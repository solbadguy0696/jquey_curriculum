import app from './_modules/app';

let searchButton = document.getElementById('js-search-button');
let searchWord = document.getElementById('js-search-word');
let pagingList = document.getElementById('return-list');

searchButton.onclick = () => {
    TweenMax.to(pagingList, 0.5, { opacity: 0, delay: 0, ease: Expo.easeInOut,
        onComplete: () => {
            app();
        }
    });
};

searchWord.onkeypress = (event) => {
    if(event.keyCode === 13) {
        TweenMax.to(pagingList, 0.5, { opacity: 0, delay: 0, ease: Expo.easeInOut,
            onComplete: () => {
                app();
            }
        });
    }
};