document.addEventListener('DOMContentLoaded', () => {
    
    'use strict'

    const buttomHome = document.querySelector('.buttom_home'),
          buttomProducts = document.querySelector('.buttom_products'),
          url = 'https://api.thedogapi.com/v1/breeds?limit=8&page=0. There',
          url1 = 'https://api.thedogapi.com/v1/breeds?limit=10&page=0. There',
          wrapper = document.querySelector('.card_wrapper'),
          acc = document.querySelector('.acc'),
          cardInfo =document.querySelectorAll('.card_item'),
          pageName = document.querySelector('.page_name');
    let btn;
         
         
          
    
    //fetch(url).then(response => response.json()).then(data => console.log(data));
    
    const getResours = async (url) => {
        const response = await fetch (url);
        
        return await response.json();
    }; 

    //getResours(url).then(value => console.log(value[0]['image']['url']));
    
    buttomHome.addEventListener('click', (e) => {
        pageName.innerHTML='<h2 >home page</h2>';
        wrapper.innerHTML = '';
        wrapper.innerHTML =`  <button class = "btn">></button>`;
        wrapper.append(acc);

               
        const data = getResours(url1)  //в data лежит promis
            .then(data => {
                   let cards = data;  
                   let start = 0;
                   let end = 2; 
                                      
                   if (cards) {
                       for (let i = start; i<= end; i++) {
                           acc.innerHTML += createCardTemplate(cards[i]);
                           
                       }
                        wrapper.classList.add('card_wrapper_slider');
                        acc.classList.add('acc_slider');
                         
                        cardInfo.forEach((item) => {
                          item.classList.add('.card_item_slider');
                      })
                     }
                     wrapper.addEventListener('click', (e) =>{
                        if (e.target && e.target.tagName == 'BUTTON'){
                             
                           for (let i = start; i<= end; i++ ){
                               
                                
                                start++;
                                end++;
                                acc.removeChild(acc.firstChild);
                                acc.innerHTML += createCardTemplate(cards[i++]);
                               
                                

                                if (end === 9) {
                                return start = 0, end = 2;
                                }
                                   
                            }
                           
                        }
                    });
                     
            });

    });

    
    


   buttomProducts.addEventListener('click', () => {
      
        pageName.innerHTML='<h2 >product page</h2> ';
        wrapper.innerHTML ='';
        wrapper.classList.remove('card_wrapper_slider');
        document.querySelectorAll('.card_item').forEach(item => {
            item.classList.remove('card_item_slider');
    });
        
        getResours(url) 
            .then(data => {
                 
                    if (data) {
                        
                        data.forEach(item => {
                            console.log(item);
                         wrapper.innerHTML += createCardTemplate(item); 
                        })
                    };        
                   
                    
        })
        

    })
     
   function createCardTemplate (item) {
        return `
            <div class="card_item">
                <div class="cards_container_foto">
                    <img src="${item['image']['url'] ? item['image']['url'] : ''}" alt="">
                </div>
                <div><span>${item['name'] ? item['name'] : ''}</span></div>
                <div><span>${item['bred_for'] ? item['bred_for'] : ''}</span></div>
            </div>
        `
    } 

    
    
    });
    

