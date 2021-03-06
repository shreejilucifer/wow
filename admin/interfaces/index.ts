// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
	id: number;
	name: string;
};

export type NewsType = {
	id: number;
	title: string;
	description: string;
	time: Date;
};

export type CompanyType = {
	id: number;
	name: string;
	category: string;
	shareCount: number;
	shareValue: number;
};
