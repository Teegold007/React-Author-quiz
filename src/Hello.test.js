import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{ shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
function Hello(props) {
    return <h1>Hello at {props.now}</h1>

}

const moment = new Date(747474557474);

describe("when testing directly", ()=>{

    let result;
    beforeAll(()=>{
        result = Hello({now: moment.toISOString})
    })

    it("return a value",()=>{
        expect(result).not.toBeNull();
    }); 
    it("is a h1",()=>{
        expect(result.type).toBe("h1");
    });
    it("as children ",()=>{
        expect(result.props.children).toBeTruthy();
    });
});
Enzyme.configure({adapter : new Adapter()});
describe("when testing with REACTDOM",() =>{
    it("renders without crashing",()=>{
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toISOString}/>,div)
    });
});
describe("when testing with Enzyme",()=>{
    it("renders a h1",()=>{
        const wrapper = shallow(<Hello now={moment.toISOString} /> )
        expect(wrapper.find("h1").length).toBe(1);
    });
});