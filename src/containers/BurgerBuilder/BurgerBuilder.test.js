import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import React,{Component} from 'react';
import BuildControls from '../../components/burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('<BurgerBuilder />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder initIngredients={()=>{}}/>);
    });

    it('should render <BuildControls /> when it has ingredients',()=>{
        wrapper.setProps({ings:{salad:1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});