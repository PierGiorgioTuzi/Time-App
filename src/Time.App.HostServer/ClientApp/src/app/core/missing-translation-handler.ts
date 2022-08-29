import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    const keys = params.key.split('.');
    return keys[keys.length - 1];
  }
}
