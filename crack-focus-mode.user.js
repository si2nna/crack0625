// ==UserScript==
// @name         크랙(CRACK) 제작 초집중 모드
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  성적 스트레스 보호
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    const hideTitles = [
        '성인 인기 랭킹',
        '공식 크리에이터들의 뜨거운 신작',
        '떠오르는 신예 창작자들',
        '요즘 트렌드',
        '여성 인기 신작',
        '베스트 랭킹',
        '신규 랭킹',
        'BL 인기 신작'
    ];

    const statRegex = /^[\d\,\.]+[kKmM]?$/i;

    function cleanUpJunk() {
        document.querySelectorAll('p').forEach(p => {
            const text = p.textContent.trim();
            if (!text) return;
          
            if (hideTitles.includes(text)) {
                const sectionWrapper = p.closest('.flex-col.w-full');
                if (sectionWrapper && sectionWrapper.style.display !== 'none') {
                    sectionWrapper.style.display = 'none';
                }
            }

            if (statRegex.test(text)) {
                const parent = p.parentElement;
                if (!parent) return;

                const dotWrapper = p.nextElementSibling;
                if (dotWrapper && dotWrapper.querySelector('.bg-line-gray-2')) {
                    p.style.display = 'none';
                    dotWrapper.style.display = 'none';
                    return;
                }

                if (parent.tagName === 'DIV' && parent.querySelector('svg')) {
                    parent.style.display = 'none';
                }
            }
        });
    }

    cleanUpJunk();

    const observer = new MutationObserver(() => {
        cleanUpJunk();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
