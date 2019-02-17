import React from 'react';
import ReactDOM from 'react-dom';
import App from './AuthorQuiz';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount,shallow,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});


const state = {
  turnData : {
    
  author:{
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  books:['David Copperfield', 'A Tale of Two Cities'],
  highlight : 'none'
  

  }
  

}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}} />, div);
  //ReactDOM.unmountComponentAtNode(div);

  
});
describe("Author Quiz", () => {
  it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}} />, div);
  });

 

  

});
describe('When the wrong answer has been selected', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={()=>{}} />);
  });

  it('should have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
  });        
});

describe("When no answer has been selected", ()=>{
  let wrapper;
  beforeAll(()=> {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=> {}}/>);
  });

  it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe();
  });
});

describe("When the first answer is selected", ()=>{
  let wrapper;
  const handleAnswerSelected = jest.fn();

  beforeAll(()=>{
    wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
    wrapper.find('.answer').first().simulate('click');    
  });

  it("onAnswerSelected should be called", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it("should receive The Shining", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalledWith("David Copperfield");
  });
});
