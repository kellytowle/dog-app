import React from 'react';
import TestRenderer from 'react-test-renderer';
import BreedList from '../BreedList/BreedList';

let tree, testInstance, json = {
    "a": [],
    "b": [
        "b1",
        "b2",
        "b3"
    ],
    "c": []
};

describe("<BreedList />", () => {

    beforeEach(function() {
        tree = TestRenderer.create(<BreedList
            breedsJSON={json}
            chooseBreed={jest.fn(() => "BreedList.props.chooseBreed has been called")}
        />);
        testInstance = tree.root;
    });

    it('is a stateless, functional component', () => {
        expect(tree.toTree().instance).toBeNull();
    });

    describe("DOM structure", () => {
        it('root node is a single <ul> element', () => {
            expect(tree.toJSON().type).toBe("ul");
            expect(testInstance.findAll(node => node.type === "ul").length).toBe(1);
        });

        it('creates a series of <li> elements', () => {
            expect(testInstance.findAll(node => node.type === "li").length).toBeGreaterThan(3);
        });
    });
});
