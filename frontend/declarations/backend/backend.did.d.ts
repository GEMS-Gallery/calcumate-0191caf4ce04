import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'add' : ActorMethod<[number, number], number>,
  'divide' : ActorMethod<[number, number], [] | [number]>,
  'multiply' : ActorMethod<[number, number], number>,
  'subtract' : ActorMethod<[number, number], number>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
