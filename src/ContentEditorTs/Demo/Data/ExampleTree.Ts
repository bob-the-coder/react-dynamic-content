import UiContainer from "../../Base/UiContainer";
import Text from "../Elements/Text";
import Image from "../Elements/Image";
import List from "../Elements/List";

const h1 = {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
};

const div = {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white'
};

const root = new UiContainer();

const textOne = new Text();
textOne.text = 'From nested trees to personalized frameworks';
textOne.font = h1;
root.children.push(textOne);

const textTwo = new Text();
textTwo.text = 'Building a nested tree is fun';
textTwo.font = div;
root.children.push(textTwo);

const inner = new UiContainer();

const textInner = new Text();
textInner.text = 'Here is everything you need to get started:';
textInner.font = div;
inner.children.push(textInner);

const list = new List();
list.items = [
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
list.font = div;
inner.children.push(list);
root.children.push(inner);

const lastText = new Text();
lastText.text = "If you don't think it's this easy, check the source code of this app. It's a few hundred lines.";
lastText.font = div;
root.children.push(lastText);

const potatoImage = new Image();
potatoImage.url = 'https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg';
potatoImage.alt = 'There should be a potato here';
root.children.push(potatoImage);

const potatoText = new Text();
potatoText.text = "Here's a potato.";
potatoText.font = div;
root.children.push(potatoText);

export default root;