export default function (itemArray, pagingLength) {
    let dom = '';
    let pagingList = document.getElementById('return-list');
    let dataPaging = Number(event.target.getAttribute('data-paging'));
    let pagingMin = (dataPaging) * pagingLength;
    let pagingMax = (dataPaging + 1) * pagingLength;
    for (let i = pagingMin; i < pagingMax; i++) {
        let item = itemArray[i];
        if(item) {
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
    TweenMax.to(pagingList, 0.5, { opacity: 0, delay: 0, ease: Expo.easeInOut,
        onComplete: function(){
            pagingList.innerHTML = dom;
            let pagingListItem = document.getElementsByClassName('lists__item');
            for(let i = 0; i < pagingLength; i++) {
                pagingListItem[i].addEventListener('mouseover', () => {
                    TweenMax.to(pagingListItem[i], 0.1, { opacity: 0.5, delay: 0, ease: Expo.easeInOut});
                });
                pagingListItem[i].addEventListener('mouseout', () => {
                    TweenMax.to(pagingListItem[i], 0.5, { opacity: 1, delay: 0, ease: Expo.easeInOut});
                });
            }
        }
    });
    TweenMax.to(pagingList, 0.5, { opacity: 1, delay: 1, ease: Expo.easeInOut});
};