import axios from 'axios';
import { TweenMax, TimelineLite } from 'gsap';

export default class Search {
    constructor() {
        this.input = document.getElementById('js-search-word');
        this.btn = document.getElementById('js-search-button');
        this.lists = document.getElementsByClassName('lists')[0];
        this.keyword = '';
        this.init();
    }

    init() {
        this.btn.addEventListener('click', this.handleSubmit.bind(this));
    }

    handleSubmit() {
        this.keyword = this.input.value;
        this.fetchBooks(this.keyword);
    }

    fetchBooks(keyword) {
        axios({
            method : 'GET',
            url    : 'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404',
            params: {
                hits: 30,
                keyword: keyword,
                applicationId: '1019399324990976605', // (今回はこのIDを使用してください)
                booksGenreId: '001'
            },
        }).then(this.loadComplete.bind(this)).catch(this.failed.bind(this));
    }

    failed() {
        this.keyword = 'あああ';
        this.fetchBooks(this.keyword);
        alert('バーカ');
        //Promise.reject();
    }

    loadComplete(res) {
        let element = '';
        res.data.Items.forEach((item, index) => {
            console.log(item);
            const book = item.Item;
            console.log(index);
            element += `<li class='lists__item' style="opacity: 0;">
                <div class='lists__item__inner'>
                    <a href='${book.itemUrl}' class='lists__item__link' target='_blank'>
                        <img src=' ${book.largeImageUrl} ' class='lists__item__img' alt=''>
                        <p class='lists__item__detail'>作品名： ${book.title} </p>
                        <p class='lists__item__detail'>作者　： ${book.author} </p>
                        <p class='lists__item__detail'>出版社： ${book.publisherName} </p>
                    </a>
                </div>
            </li>`;
        });
        this.lists.innerHTML = element;
        console.log(this.lists.getElementsByTagName('li'));
        const li = this.lists.getElementsByTagName('li');
        const tl = new TimelineLite();
        // Array.prototype.forEach(li, (element, index) => {
        //     tl.to(element, 1, { opacity: 1, delay: 1, ease: Expo.easeInOut});
        // });
        //tl.to(li, 1, { opacity: 1, delay: 0.5, ease: Expo.easeInOut});
        TweenMax.staggerTo(".lists__item", 1, { opacity: 1, ease: Expo.easeInOut}, 0.1);
    }
}