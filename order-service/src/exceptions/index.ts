import { ExtendableError } from 'ts-error';

export class EntityAlreadyExists extends ExtendableError {}
export class EntityNotFound extends ExtendableError {}
export class NotCancellable extends ExtendableError {}
