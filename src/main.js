// Vue is ready, but not used yet
import './index.css'
import './font-awesome.css'
import 'animate.css';

document.addEventListener("DOMContentLoaded", function(event) {
    /* IntersectionObserver on <article>s */
    setNavActiveClassOnScroll()


    /* SLIDER */
    let slides = document.querySelectorAll('#slider > li')
    let current_slide = 1;
    setInterval(function() {
        current_slide = current_slide < slides.length ? ++current_slide : 1

        //hide all slides
        document.querySelectorAll('#slider > li').forEach(function(el) {
            el.classList.add('hidden')
        });

        //show current slide
        slides[current_slide-1].classList.remove('hidden')
        let trash = animateCSS(slides[current_slide-1], 'bounceInRight');


    }, 5500) //end interval



    /* smooth scrolling when click to href=#... */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            /* @todo - how to use global function resetLinksClasses(); here? */
            let links = document.getElementsByTagName('a')
            for (let i = 0; i < links.length; ++i) {
                links[i].classList.remove('active');
            }

            /* manually add active class, because
               IntersectionObserver randomly fails
            * // bo to neni dobry zpusob jak tohle resit. lepsi podle pozice elementu .top
            *  */
            anchor.classList.add('active')

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })



    /* ANIMATE.css */
    const animateCSS = (element, animation, prefix = 'animate__') =>
        // We create a Promise and return it
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;

            element.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                element.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            element.addEventListener('animationend', handleAnimationEnd, {once: true});
        });

})


/** check wich article is on viewpoprt and set class to its nav button by #id */
function setNavActiveClassOnScroll() {

    let options = { threshold: 0.64 }
    let observer = new IntersectionObserver(observerCallback, options)

    document.querySelectorAll('article').forEach(
        article => observer.observe(article)
    )

}

function observerCallback(entry) {
    if (entry[0].isIntersecting) {
        let id = entry[0].target.getAttribute('id')
        if (id === 'hero_footer') id = 'services'

        resetLinksClasses();
        
        document.getElementById("link-" + id).classList.add('active')
   }


function resetLinksClasses() {
    let links = document.getElementsByTagName('a')

    for (let i = 0; i < links.length; ++i) {
        links[i].classList.remove('active');
    }
}


}


