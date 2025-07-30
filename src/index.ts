
window.onload = () => {
    let buttons = document.querySelectorAll('.digit');
    let skipButton = document.querySelector('.skip');
    let confirmationButton = document.querySelector('.confirmation');
    let initiativePreview = document.querySelector('.initiative-preview');
    let initiativeEntries = document.querySelector('.initiative-entries');
    let colorSelectionButton = document.querySelector('.color-selection');
    let initiativeCountLabel = document.querySelector('.initiative-count');


    let goBack = () => {
        buttons.forEach(button => {
            button.textContent = button.textContent[1];
        });
        document.querySelector('.skip').textContent = '';
    }

    let toggleColor = () => {
        if (colorSelectionButton.classList.contains('orange')) {
            colorSelectionButton.classList.remove('orange');
            colorSelectionButton.classList.add('blue');
        }
        else {
            colorSelectionButton.classList.remove('blue');
            colorSelectionButton.classList.add('orange');
        }
    }

    buttons.forEach((clickedButton) => {
        clickedButton.addEventListener('click', () => {
            let clickedText = clickedButton.textContent;
            if (clickedButton.textContent.length == 1) {
                buttons.forEach(button => {
                    button.textContent = clickedText + button.textContent;
                });
                document.querySelector('.skip').textContent = '<-';
            }
            else {
                let initiativeButton = document.createElement('button');
                initiativeButton.innerText = clickedText;

                initiativeButton.addEventListener('click', () => {
                    initiativeButton.remove();
                    initiativeCountLabel.innerHTML = initiativePreview.childElementCount.toString();
                });


                if (colorSelectionButton.classList.contains('blue')) {
                    initiativeButton.classList.add('blue');
                }
                if (colorSelectionButton.classList.contains('orange')) {
                    initiativeButton.classList.add('orange');
                }

                let initiative = parseInt(clickedText);
                let next = Array.from(initiativePreview.childNodes).find(x => parseInt(x.textContent) < initiative) || null
                initiativePreview.insertBefore(initiativeButton, next);

                initiativeCountLabel.innerHTML = initiativePreview.childElementCount.toString();
                toggleColor();
                goBack();
            }
        });
    });


    skipButton.addEventListener('click', () => {
        switch (skipButton.textContent) {
            case '':
                break;
            case '<-':
                goBack();
                break;
        }
    });


    confirmationButton.addEventListener('click', () => {
        Array.from(initiativePreview.children).forEach(previewEntry => {
            let initiativeEntry = document.createElement('li');
            initiativeEntry.innerText = previewEntry.textContent;
            initiativeEntries.appendChild(initiativeEntry);
            if (previewEntry.classList.contains('orange')) {
                initiativeEntry.classList.add('orange')
            }
            if (previewEntry.classList.contains('blue')) {
                initiativeEntry.classList.add('blue')
            }
        })

        while (initiativePreview.firstChild) {
            initiativePreview.removeChild(initiativePreview.firstChild);
        }
        initiativeCountLabel.innerHTML = initiativePreview.childElementCount.toString();

        initiativeEntries.children[0].classList.add('active')

        document.body.classList.add('combat-round');
    });

    colorSelectionButton.addEventListener('click', () => {
        toggleColor();
    })

    initiativeEntries.addEventListener('click', (pointerEvent: PointerEvent) => {
        let activeIndex = Array.from(initiativeEntries.children).findIndex(x => x.classList.contains('active'));
        let xPercentage = pointerEvent.clientX / window.innerWidth;

        if (xPercentage >= 0.5) {
            if (activeIndex + 1 < initiativeEntries.children.length) {
                initiativeEntries.children[activeIndex].classList.remove('active');
                initiativeEntries.children[activeIndex + 1].classList.add('active');
            }
        }
        else {
            if (activeIndex - 1 >= 0) {
                initiativeEntries.children[activeIndex].classList.remove('active');
                initiativeEntries.children[activeIndex - 1].classList.add('active');
            }
        }
    });

    initiativeEntries.addEventListener('dblclick', (pointerEvent: PointerEvent) => {
        let activeIndex = Array.from(initiativeEntries.children).findIndex(x => x.classList.contains('active'));
        let xPercentage = pointerEvent.clientX / window.innerWidth;

        if (xPercentage >= 0.5 && activeIndex == initiativeEntries.children.length - 1) {
            while (initiativeEntries.firstChild) {
                initiativeEntries.removeChild(initiativeEntries.firstChild);
            }
            document.body.classList.remove('combat-round');
        }
    });
}