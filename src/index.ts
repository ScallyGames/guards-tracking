
window.onload = () =>
{
    let buttons = document.querySelectorAll('.digit');
    let skipButton = document.querySelector('.skip');
    let summonButton = document.querySelector('.summon');
    let confirmationButton = document.querySelector('.confirmation');
    let initiativePreview = document.querySelector('.initiative-preview');
    let initiativeEntries = document.querySelector('.initiative-entries');

    let goBack = () =>
    {
        buttons.forEach(button => 
        {
            button.textContent = button.textContent[1];
        });
        document.querySelector('.skip').textContent = '';
    }

    buttons.forEach((clickedButton) =>
    {
        clickedButton.addEventListener('click', () => 
        {
            let clickedText = clickedButton.textContent;
            if(clickedButton.textContent.length == 1)
            {
                buttons.forEach(button => 
                {
                    button.textContent = clickedText + button.textContent;
                });
                document.querySelector('.skip').textContent = '<-';
            }
            else
            {
                let initiativeButton = document.createElement('button');
                initiativeButton.innerText = clickedText;
                initiativeButton.addEventListener('click', () =>
                {
                    initiativeButton.remove();
                });
                if(summonButton.classList.contains('active'))
                {
                    initiativeButton.classList.add('with-summon');
                }
                initiativeButton.classList
                let initiative = parseInt(clickedText);
                let next = Array.from(initiativePreview.childNodes).find(x => parseInt(x.textContent) > initiative) || null
                initiativePreview.insertBefore(initiativeButton, next);
                summonButton.classList.remove('active');
                goBack();
            }
        });
    });

    
    skipButton.addEventListener('click', () =>
    {
        switch (skipButton.textContent)
        {
            case '':
                break;
            case '<-':
                goBack();
                break;
        }
    });

    summonButton.addEventListener('click', () =>
    {
        summonButton.classList.toggle('active');
    });

    confirmationButton.addEventListener('click', () =>
    {
        Array.from(initiativePreview.children).forEach(previewEntry => 
        {
            let initiativeEntry = document.createElement('li');
            initiativeEntry.innerText = previewEntry.textContent;
            initiativeEntries.appendChild(initiativeEntry);
        })

        while (initiativePreview.firstChild) 
        {
            initiativePreview.removeChild(initiativePreview.firstChild);
        }

        initiativeEntries.children[0].classList.add('active')

        document.body.classList.add('combat-round');
    });

    initiativeEntries.addEventListener('click', () => 
    {
        console.log('clicked');
        let activeIndex = Array.from(initiativeEntries.children).findIndex(x => x.classList.contains('active'));
        initiativeEntries.children[activeIndex].classList.remove('active');
        if(activeIndex + 1 < initiativeEntries.children.length)
        {
            initiativeEntries.children[activeIndex + 1].classList.add('active');
        }
        else
        {
            while (initiativeEntries.firstChild) 
            {
                initiativeEntries.removeChild(initiativeEntries.firstChild);
            }
            document.body.classList.remove('combat-round');
        }
    });
}