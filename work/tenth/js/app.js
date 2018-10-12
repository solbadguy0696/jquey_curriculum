import axios from 'axios';
import paging from './paging';
import {TweenMax} from 'gsap';

export default function () {
    const id = document.getElementById('return-list');
    let keyword = document.getElementById('js-search-word').value;
    let dom = '';

    // GET通信
    axios({
        method : 'GET',
        url    : 'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20130522',
        params: {
            hits: 30,
            keyword: keyword,
            applicationId: '1019399324990976605', // (今回はこのIDを使用してください)
            booksGenreId: '001'
        },
    })
    // thenで成功した場合の処理をかける
    .then(response => {
        console.log('status:', response.status); // 200
        console.log('body:', response.data);     // response body.
        let obj = response.data.Items;
        let itemArray = [];
        let pagingLength = 10;
        let itemLength = Math.ceil(obj.length / pagingLength);
        let pagingList = document.getElementById('paging-list');
        for (let key in obj) {
            itemArray.push(obj[key].Item);
            if(key < pagingLength) {
                let item = itemArray[key];
                dom += 
                    "<li class='lists__item'>" +
                        "<div class='lists__item__inner'>" +
                            "<a href='" + item.itemUrl + "' class='lists__item__link' target='_blank'>" +
                                "<img src='" + item.largeImageUrl + "' class='lists__item__img' alt=''>" +
                                "<p class='lists__item__detail'>作品名：" + item.title + "</p>" +
                                "<p class='lists__item__detail'>作者　：" + item.author + "</p>" +
                                "<p class='lists__item__detail'>出版社：" + item.publisherName + "</p>" +
                            "</a>" +
                        "</div>" +
                    "</li>";
            }
        }
        id.innerHTML = dom;
        let pagingItem = '';
        for(let i = 0; i < itemLength; i++){
            pagingItem += '<li><button type="button" class="js-paging-button" style="font-size: 1.5rem; padding: 1rem;" data-paging="' + i + '">' + (i + 1) + '</button></li>'
        }
        let pagingListNew = '<ul id="paging-list" style="display: flex;justify-content: center;align-items: center;padding: 30px;">' + pagingItem + '</ul>'
        let pagingButton = document.getElementsByClassName('js-paging-button');
        let pagingListItem = document.getElementsByClassName('lists__item');
        if(pagingList) {
            pagingList.innerHTML = pagingItem;
        }else {
            id.insertAdjacentHTML('afterend', pagingListNew);
        }
        for(let i = 0; i < pagingLength; i++) {
            pagingListItem[i].addEventListener('mouseover', () => {
                TweenMax.to(pagingListItem[i], 0.1, { opacity: 0.5, delay: 0, ease: Expo.easeInOut});
            });
            pagingListItem[i].addEventListener('mouseout', () => {
                TweenMax.to(pagingListItem[i], 0.5, { opacity: 1, delay: 0, ease: Expo.easeInOut});
            });
        }
        for(let i = 0; i < itemLength; i++) {
            pagingButton[i].addEventListener('click', () => {
                paging(itemArray, pagingLength);
            });
        }
        TweenMax.to(id, 0.5, { opacity: 1, delay: 0, ease: Expo.easeInOut});
    // catchでエラー時の挙動を定義する
    }).catch(err => {
        console.log('err:', err);
        let pagingList = document.getElementById('paging-list');
        if(pagingList) {
            pagingList.parentNode.removeChild(pagingList);
        }
        let responceMessage = '検索結果が見つかりませんでした。'
        if(keyword.length == 1) {
            responceMessage = '検索には2文字以上の入力が必要です。'
        }
        dom = 
            "<li class='lists__item' style='width: 100%;'>" +
                "<div class='lists__item__inner'>" +
                    "<p>" + responceMessage + "</p>" +
                "</div>" +
            "</li>";
        id.innerHTML = dom;
        TweenMax.to(id, 0.5, { opacity: 1, delay: 0, ease: Expo.easeInOut});
    });
};