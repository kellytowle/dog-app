import React from 'react';
import TestRenderer from 'react-test-renderer';
import BreedApp from './BreedApp';
import BreedList from '../BreedList/BreedList';
import DogBreed from "../DogBreed/DogBreed";

jest.mock('../fetch');

let tree, testInstance, json, renderedNode;

describe("<BreedApp />", () => {

    describe("DOM structure", () => {
        beforeEach(function() {
            tree = TestRenderer.create(<BreedApp />);
            testInstance = tree.root;
        });

        it('root node is a single <main> element', () => {
            expect(tree.toJSON().type).toBe("main");
            expect(testInstance.findAll(node => node.type === "main").length).toBe(1);
        });

        it('root node contains two <section> elements', () => {
            expect(tree.toJSON().children.length).toBe(2);
            expect(tree.toJSON().children[0].type).toBe("section");
            expect(tree.toJSON().children[1].type).toBe("section");
        });

        describe("first <section>", () => {
            beforeEach(() => {
                const
                    firstSectionJSON = tree.toJSON().children[0],
                    mainElement = tree.toTree().rendered,
                    firstSection = mainElement.rendered[0];

                json = firstSectionJSON;
                renderedNode = firstSection;
            });

            it('has attribute of `data-view="list"`', () => {
                expect(json.props['data-view']).toBe("list");
            })

            it('has attribute of `data-is-active` with default value of `true`', () => {
                console.log("json: ", json);
                console.log("json.props: ", json.props);
                console.log("json.props[\"data-is-active\"]: ", json.props["data-is-active"]);
                expect(Object.keys(json.props).findIndex(prop => prop === "data-is-active")).toBeGreaterThan(-1);
                expect(json.props["data-is-active"]).toBe(true);
            })

            it('contains <h1>', () => {
                expect(json.type).toBe("section");
                expect(json.children.length).toBe(2);
                expect(json.children[0].type).toBe("h1");
            })

            it('contains <BreedList /> component', () => {
                expect(json.type).toBe("section");
                expect(json.children.length).toBe(2);
                expect(renderedNode.rendered[1].type).toBe(BreedList);
            });

        })

        describe("second <section>", () => {
            beforeEach(() => {
                const
                    secondSectionJSON = tree.toJSON().children[1],
                    mainElement = tree.toTree().rendered,
                    secondSection = mainElement.rendered[1];

                json = secondSectionJSON;
                renderedNode = secondSection;
            });

            it('has attribute of `data-view="breed"`', () => {
                expect(json.props['data-view']).toBe("breed");
            })

            it('has attribute of `data-is-active` with default value of `false`', () => {
                expect(Object.keys(json.props).findIndex(prop => prop === "data-is-active")).toBeGreaterThan(-1);
                expect(json.props["data-is-active"]).toBe(false);
            })

            it('contains <DogBreed /> component', () => {
                expect(json.type).toBe("section");
                expect(json.children.length).toBe(1);
                expect(renderedNode.rendered[0].type).toBe(DogBreed);
            });

        })
    });

    describe("Component state", () => {

    })
});
