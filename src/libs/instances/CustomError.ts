

export class CustomError extends Error {
    custom: boolean;
    status: number;
    private __proto__: any;
    constructor(props: {custom: boolean, message: string, status: number }){
        super(props.message)
        this.custom = props.custom;
        this.message = props.message;
        this.status = props.status;
        const actualProto = new.target.prototype;
        if(Object.setPrototypeOf){Object.setPrototypeOf(this, actualProto);}
        else {this.__proto__ = actualProto;}
    }
}