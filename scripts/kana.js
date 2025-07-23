// Imports
        import allDecks from '../data/decks.js'
        
        // Page Elements
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        const visualCtn = document.querySelector('#visual-ctn');
        const hintsCtn = document.querySelector('#hints-ctn');
        const deckList = document.querySelector('#deck-list');
        const textBox = document.querySelector('#text-box');
        const answerFrm = document.querySelector('#answer-frm');
        const answerIcon = document.querySelector('#answer-icon');
        const progressBar = document.querySelector('#progress-bar');

        // Variables
        let shuffledDeck = [];
        let index = 0;

        // Functions
        function fisherYatesShuffle(arr) {
            let newArr = [...arr];

            for(let i = arr.length-1; i >= 0; i--) {
                let j = Math.floor(Math.random() * (i+1));

                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }

            return newArr;
        }

        function setupPage(card) {
            // Clear visual
            visualCtn.innerText = '';

            // Clear Hints
            hintsCtn.innerHTML = '';

            // Clear input
            textBox.value = '';

            // Display Kanji, adjust font size
            if(card.kana.length >= 4) {
                visualCtn.style.fontSize = '5em';
            } else if (card.kana.length > 2) {                
                visualCtn.style.fontSize = '8em';
            }


            visualCtn.innerText = card.kanji;
            if(card.kanji == '') {
                visualCtn.innerText = card.visual;
            }

            // Create hint buttons
            for(let char of card.kana) {
                const hint = document.createElement('button');
                hint.innerText = char;

                // Turn button text white on click
                hint.addEventListener('click', (e) => {                    
                    e.target.classList.add('text-reveal');
                });

                // Add to hints container
                hintsCtn.appendChild(hint);
            }
        }

        // Check entered kana againt answer
        function handleSubmit(e) {
            e.preventDefault();

            if(textBox.value === shuffledDeck[index].kana) {
                answerIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                progressBar.classList.add('animate'); 
                
                // If answered last question
                if(index === shuffledDeck.length - 1) {                    
                    document.querySelector('#content').innerHTML = '<h1>Quiz Complete</h1><button id="return-btn"><a href="/index.html" target="_self">Return</a></button>';
                    return;
                }                

                // Setup next page after 1 second
                const setupTimer = setTimeout(() => {
                    answerIcon.innerHTML = '<i class="fa-regular fa-circle"></i>';
                    index += 1;                    
                    setupPage(shuffledDeck[index]);
                    clearTimeout(setupTimer)
                    progressBar.classList.remove('animate');
                }, 1000);
            } else {
                answerIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
            }
        }

        // Event Listeners

        // Load content into page
        document.addEventListener('DOMContentLoaded', () => {
            h1.innerText = 'Time to practice!';
            h2.innerText = 'がんばってください！！！';
            allDecks.forEach(d => {
                const deckBtn = document.createElement('button');
                deckBtn.innerText = d.name;
                deckBtn.addEventListener('click', () => {
                    shuffledDeck = fisherYatesShuffle(d.deck);
                    setupPage(shuffledDeck[index]);
                })
                deckList.appendChild(deckBtn);
            });            
        })
    
        answerFrm.addEventListener('submit', handleSubmit)