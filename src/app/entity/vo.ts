import { Injectable } from '@angular/core';

@Injectable()
export class Vo {

    private check: boolean;
	private data: any;
	private msg: string;

	isCheck() {
        return this.check;
	}

	getData() {
		return this.data;
	}

	getMsg() {
		return this.msg;
	}

}