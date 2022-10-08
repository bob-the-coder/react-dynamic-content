import { Container, TextElement, ImageElement, ListElement } from "./ContentModel";

const defaultFontOptions = {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white'
};

const demoTree = new Container({
    children: [
        new TextElement({
            text: 'From nested trees to personalized frameworks',
            fontOptions: {
                fontSize: 28,
                fontWeight: 'bold',
                color: 'red'
            }
        }),
        new TextElement({
            text: 'Building a nested tree is fun',
            fontOptions: defaultFontOptions
        }),
        new Container({
            children: [
                new TextElement({
                    text: 'Here is everything you need to get started:',
                    fontOptions: defaultFontOptions
                }),
                new ListElement({
                    items: [
                        "Get yourself an IDE. Any one will do.",
                        "Start learning programming. Javascript is a good place to start.",
                        "Learn all you can about binary trees.",
                        "Learn what you can about decision trees.",
                        "Find a course on React that teaches you more than a todo list.",
                        "Realize that half of the solutions on the internet don't suit your particular needs.",
                        "Start developing your own framework.",
                        "???",
                        "Profit."
                    ]
                })
            ]
        }),
        new TextElement({
            text: "If you don't think it's this easy, check the source code of this app. It's a few hundred lines.",
            fontOptions: defaultFontOptions
        }),
        new ImageElement({
            url: 'https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg',
            alt: 'There should be a potato here'
        }),
        new TextElement({
            text: "Here's a potato."
        })
    ]
});

export default {
    model: demoTree,
    fontOptions: defaultFontOptions
};