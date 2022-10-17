import {DefaultElements} from "./ExampleElements";

const h1 = {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
};

const textOne = {...DefaultElements.Text};
textOne.type = 'Text';
textOne.settings.Text.text = 'From nested trees to personalized frameworks';
textOne.settings.Font = {...textOne.settings.Font, ...h1};

const textTwo = {...DefaultElements.Text};
textTwo.type = 'Text';
textTwo.settings.Text.text = 'Building a nested tree is fun';

const textInner = {...DefaultElements.Text};
textInner.type = 'Text';
textInner.settings.Text.text = 'Here is everything you need to get started:';

const list = {...DefaultElements.List};
list.type = 'List';
    list.settings.List.items = [
    "Get yourself an IDE. Any one will do.",
    "Start learning programming. Javascript is a good place to start.",
    "Learn all you can about binary trees.",
    "Learn what you can about decision trees.",
    "Find a course on React that teaches you more than a todo list.",
    "Realize that half of the solutions on the internet don't suit your particular needs.",
    "Start developing your own framework.",
    "???",
    "Profit."
];
    
const inner = {...DefaultElements.Container};
inner.type = 'Container';
inner.children = [textInner, list];

const lastText = {...DefaultElements.Text};
lastText.type = 'Text';
lastText.settings.Text.text = "If you don't think it's this easy, check the source code of this app. It's a few hundred lines.";

const potatoImage = {...DefaultElements.Image};
potatoImage.type = 'Image';
potatoImage.settings.Image.url = 'https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg';
potatoImage.settings.Image.alt = 'There should be a potato here';

const potatoText = {...DefaultElements.Text};
potatoText.type = 'Text';
potatoText.settings.Text.text = "Here's a potato.";

const root = {...DefaultElements.Container};
root.type = 'Container';
root.children = [textOne, textTwo, inner, lastText, potatoImage, potatoText];

export default root;