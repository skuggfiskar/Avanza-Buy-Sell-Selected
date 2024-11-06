// ==UserScript==
// @name         Buy/Sell all selected
// @namespace    http://tampermonkey.net/
// @version      2024-11-06
// @description  Add a "Buy All Selected" and "Sell All Selected" button on the bevakningslistor.html page that allows you to select some stocks and then go to the buy/sell page to buy or sell all of them
// @author       Skuggfiskar
// @match        https://www.avanza.se/hall-koll/bevakningslistor.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=avanza.se
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the buttons
    function createButtons() {
        const container = document.querySelector('#surface > div > div:nth-child(3) > div > div.tabs_content');

        const buyButton = document.createElement('button');
        buyButton.innerText = 'Buy All Selected';
        buyButton.style.marginTop = '10px';
        buyButton.addEventListener('click', () => handleButtonClick('BUY'));

        const sellButton = document.createElement('button');
        sellButton.innerText = 'Sell All Selected';
        sellButton.style.marginTop = '10px';
        sellButton.style.marginLeft = '10px';
        sellButton.addEventListener('click', () => handleButtonClick('SELL'));

        container.appendChild(buyButton);
        container.appendChild(sellButton);
    }

    // Handle button click for Buy or Sell
    function handleButtonClick(side) {
        const rows = document.querySelectorAll('#surface > div > div:nth-child(3) > div > div.tabs_content > div > table > tbody > tr');
        let orderbookIds = [];

        rows.forEach(row => {
            const checkbox = row.querySelector('td.tRight.markForComparison input[type=checkbox]');
            const link = row.querySelector('td.instrumentName span a');

            if (checkbox && checkbox.checked && link) {
                const hrefParts = link.href.split('/');
                const orderbookId = hrefParts[hrefParts.length - 2];
                orderbookIds.push(orderbookId);
            }
        });

        if (orderbookIds.length > 0) {
            const accountId = 'iijaieh';
            const url = `https://www.avanza.se/handla/flera.html/fordela?sAccountId=${accountId}&${orderbookIds.map(id => `orderbookIds=${id}`).join('&')}&side=${side}`;
            window.location.href = url;
        } else {
            alert('No items selected');
        }
    }

    // Add the buttons to the page
    createButtons();
})();
