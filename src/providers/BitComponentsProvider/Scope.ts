import Item from "./Item";


export default class Scope extends Item {

    constructor(
        public name: string,
        public children: Item[]
    ) {
        super(name, children);
    }


}