import {DefaultElements} from "./ExampleElements";

const h1 = {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
};

const textOne = DefaultElements.Text('From nested trees to personalized frameworks');
textOne.settings.Font = {...textOne.settings.Font, ...h1};

const textTwo = DefaultElements.Text('Building a nested tree is fun');

const textInner = DefaultElements.Text('Here is everything you need to get started:');

const list = DefaultElements.List([
    "Get yourself an IDE. Any one will do.",
    "Start learning programming. Javascript is a good place to start.",
    "Learn all you can about binary trees.",
    "Learn what you can about decision trees.",
    "Find a course on React that teaches you more than a todo list.",
    "Realize that half of the solutions on the internet don't suit your particular needs.",
    "Start developing your own framework.",
    "???",
    "Profit."
]);

const otherList = DefaultElements.List([
    "This is another list",
    "Just testing references",
]);

const inner = DefaultElements.Container([textInner, list, otherList]);

const lastText = DefaultElements.Text("If you don't think it's this easy, check the source code of this app. It's a few hundred lines.");

const potatoImage = DefaultElements.Image(
    'https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg', '' +
    'There should be a potato here');

const potatoText = DefaultElements.Text("Here's a potato.");

const root = DefaultElements.Container([textOne, textTwo, inner, lastText, potatoImage, potatoText]);

export default root;